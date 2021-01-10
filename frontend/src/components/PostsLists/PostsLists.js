/* eslint-disable */
import React,{useState} from 'react';
import { Container , Row, Col} from 'reactstrap';
import CardBox from "../CardBox/CardBox";
import './PostsLists.css';
import CommentsFromPost from "../CommentsFromPost/CommentsFromPost";
import {API} from "../../api-service";
import CustomPagination from "../CustomPagination/CustomPagination";


function PostsLists ({ posts, cookies, deletePost, page, setPage, maxPage})  {
    const [comments, setComments] = useState([]);

    const getComments = (id) => {
        async function fetchDataComments() {
            return API.getComments(cookies['mr-token'], id)
        }
        fetchDataComments().then(r => setComments(r));
    }


    return(
        <Container >
            { comments && comments.length>0?
                <CommentsFromPost comments={comments} setComments={setComments}/>:
                posts && posts.length>0?
                    <div className="mt-5">
                        <CustomPagination page={page} setPage={setPage} maxPage={maxPage}/>
                        <Row>
                            {posts.map((post) => (
                                <Col xs="4" key={post.id} className="mb-5">
                                    <CardBox post={post}
                                             getComments={getComments}
                                             onDeletePost={deletePost}/>
                                </Col>
                            ))}
                        </Row>
                    </div>
                :<h1 className="no-post"> No posts to show! Please add some posts in "New Post" section</h1>
            }
        </Container>
    )
}
//
//
// PostsLists.propTypes = {
//     posts: PropTypes.func.isRequired,
//     comments: PropTypes.func,
// };
//
// PostsLists.defaultProps = {
//     comments: [],
// };

export default PostsLists;















