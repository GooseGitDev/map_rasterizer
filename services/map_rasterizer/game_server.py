from fastapi import WebSocket
from typing import List

class GameServer:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print("📡 Player connected to game server!")
        await websocket.send_json({"type": "SYSTEM", "message": "Connected to Game Server!"})

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        print("❌ Player disconnected.")

    async def handle_message(self, websocket: WebSocket, message: str):
        print(f"📩 Received from client: {message}")
        # Echo back a response to prove network functionality
        await websocket.send_json({"type": "ECHO", "message": f"Server heard: {message}"})

# Create a single instance to be shared across the app
game_server = GameServer()
