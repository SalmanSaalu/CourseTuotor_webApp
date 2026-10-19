
# chat/middlewares.py

from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser


@database_sync_to_async
def get_user_from_token(token_string):
    try:
        token = Token.objects.select_related("user").get(
            key=token_string
        )
        return token.user
    except Token.DoesNotExist:
        return AnonymousUser()


class TokenAuthMiddleWare:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        scope = dict(scope)

        query_params = parse_qs(
            scope.get("query_string", b"").decode("utf-8")
        )

        token_values = query_params.get("token", [])

        if token_values and token_values[0]:
            scope["user"] = await get_user_from_token(
                token_values[0]
            )
        else:
            scope["user"] = AnonymousUser()

        return await self.app(scope, receive, send)
