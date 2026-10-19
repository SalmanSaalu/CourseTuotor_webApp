"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from chat.middlewares import TokenAuthMiddleWare
from channels.security.websocket import AllowedHostsOriginValidator
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
 
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter , URLRouter
from chat import routing
 
# application = ProtocolTypeRouter(
#     {
#         "http" : get_asgi_application() , 
#         "websocket" : AuthMiddlewareStack(
#             URLRouter(
#                 routing.websocket_urlpatterns
#             )    
#         )
#     }
# )



# import os
# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from chatapp import routing



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")



application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": TokenAuthMiddleWare(
            AllowedHostsOriginValidator(
        URLRouter(
            routing.websocket_urlpatterns
        ))
    ),
})