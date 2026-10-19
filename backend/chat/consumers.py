
import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        user = self.scope["user"]

        # Reject unauthenticated WebSocket connections
        if not user.is_authenticated:
            await self.close()
            return

        current_user_id = user.id
        other_user_id = self.scope["url_route"]["kwargs"]["id"]

        # Both participants must use the same room name
        if int(current_user_id) > int(other_user_id):
            self.room_name = f"{current_user_id}_{other_user_id}"
        else:
            self.room_name = f"{other_user_id}_{current_user_id}"

        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, "room_group_name"):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        data = json.loads(text_data)

        message = data.get("message", "")
        username = data.get("username", "")
        date_details = data.get("dateDetails", "")

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "send_message",
                "message": message,
                "username": username,
                "dateDetails": date_details,
            }
        )

    async def send_message(self, event):
        await self.send(
            text_data=json.dumps({
                "message": event["message"],
                "username": event["username"],
                "dateDetails": event["dateDetails"],
            })
        )
