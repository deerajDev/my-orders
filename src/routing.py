from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from chats.routing import websocket_urlpatterns

application = ProtocolTypeRouter({

    #for websocket protocol
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )

    )
})
