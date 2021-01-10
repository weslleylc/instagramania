from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 6


class CustomPagination(PageNumberPagination):
    page = DEFAULT_PAGE
    page_size = DEFAULT_PAGE_SIZE
    page_size_query_param = "page_size"

    def get_paginated_response(self, data):
        return Response({
            'data': data,
            'meta': {
                'last_page': int(math.ceil(self.page.paginator.count / DEFAULT_PAGE_SIZE)),
                'page': int(self.request.GET.get('page', DEFAULT_PAGE)),
                'page_size': int(self.request.GET.get('page_size', self.page_size))
            }
        })