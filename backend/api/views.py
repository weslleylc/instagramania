from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import viewsets, generics, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from .models import Post, Comment
from .pagination import CustomPagination
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from .ml.processing import preprocess_sentence
import joblib
import instaloader
import pathlib
from .local import *


cache = None
model = None
tfdf = None


CURRENT_PATH = pathlib.Path(__file__).parent.absolute()
CURRENT_PATH = CURRENT_PATH.as_posix()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def get_comment(comment):
    likes = comment.likes_count
    input = preprocess_sentence(comment.text)
    input = tfdf.transform([input])
    value = model.predict(input)[0]
    value = int(value * 100)
    return {'comment': comment.text, 'sentiment': value, "likes": likes}


def predict_sentiment_post(short_code="CBgHs1Xjgin", max_comments=10):
    global cache, model, tfdf
    if not cache:
        cache = joblib.load(open(CURRENT_PATH + '/ml/cache/predict_param.pickle', 'rb'))
        model = cache['clf']
        tfdf = cache['tfdf']

    loader = instaloader.Instaloader()
    # Optionally, login or load session
    loader.login(USER, PASSWORD)  # (login)
    post = instaloader.Post.from_shortcode(loader.context, short_code)
    image_path = post.url
    post_likes = post.likes
    instagram_user = post.owner_username
    description = post.caption
    comments = []
    count = 1
    negative = 0
    positive = 0
    # posts_sorted_by_likes = sorted(post.get_comments(),
    #     key=lambda p: p.likes_count,
    #     reverse=True)
    for comment in post.get_comments():
        # print(i.text)
        replies = []
        count_replies = 1
        current_comment = get_comment(comment)
        for sub_comment in comment.answers:
            replies.append(get_comment(sub_comment))
            if count_replies == max_comments:
                break
            count_replies = count_replies + 1
        current_comment["reply_set"] = replies
        comments.append(current_comment)

        if current_comment["sentiment"] > 50:
            positive = positive + 1
        else:
            negative = negative + 1


        if count == max_comments:
            break
        count = count + 1

    total = positive + negative
    return description, instagram_user, image_path, post_likes, positive, negative, total, comments

@api_view(["POST"])
def predict(request):
    short_code = request.data.get('short_code', None)
    max_comments = request.data.get('max_comments', None)

    positive, negative, total, comments = predict_sentiment_post(short_code, max_comments)
    # jsonify({'positive': positive, 'negative': negative, 'total': total, 'comments': comments})
    return Response({'positive': positive, 'negative': negative, 'total': total, 'comments': comments})



class PostViewSet(viewsets.ModelViewSet):
    '''
    API endpoint that allows Posts to be CRUDed.
    '''

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination



    def get_queryset(self):
        """Return the authenticated user's posts."""
        return super().get_queryset().filter(user=self.request.user)


    def create(self, request):
        # do your thing here
        link = request.data.get('link', None)
        token = link.replace("https://www.instagram.com/p/", "")[:-1]
        number_comments = request.data.get('number_comments', None)

        description, instagram_user, image_path, post_likes, positive, negative, total, comments = predict_sentiment_post(short_code=token,  max_comments=number_comments)

        if not description:
            description = "No description"
        post = Post(number_negative=negative, number_positive=positive, number_comments=negative + positive,
                    user_id=request.user.id, token=token, link=link, image_path=image_path, description=description,
                    instagram_user=instagram_user, likes=post_likes)
        post.save()


        for comment in comments:
            comment["post_id"] = post.id
            replies = comment.pop("reply_set", [])
            current_comment = Comment(**comment)
            current_comment.save()
            for reply in replies:
                reply["parent_id"] = current_comment.id
                Comment(**reply).save()

        return Response(PostSerializer(post).data)


    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


    def retrieve(self, request, *args, **kwargs):
        post = self.get_queryset().filter(id=self.kwargs.get('pk')).first()

        if post:
            return Response(PostSerializer(post).data)

        return Response({
            'detail': "Not found."
        })



class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    pagination_class = CustomPagination

    @action(detail=True, methods=['GET'])
    def from_post(self, request, pk=None):
        comments = self.get_queryset().filter(post=pk)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)



    # def retrieve(self, request, *args, **kwargs):
    #     comment = self.get_queryset().filter(id=self.kwargs.get('pk')).first()
    #
    #     if comment:
    #         return Response(CommentSerializer(comment).data)
    #
    #     return Response({
    #         'detail': "Not found."
    #     })
    #
    #
    # def list(self, request, *args, **kwargs):
    #     user = self.request.user
    #     post = Post.objects.filter(user=user)
    #     comments = self.get_queryset().filter(post__in=post)
    #
    #     if comments:
    #         return Response(CommentSerializer(comments, many=True).data)
    #
    #     return Response({
    #         'detail': "Not found."
    #     })
