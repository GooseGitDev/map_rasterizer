from fastapi import APIRouter, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from services.map_rasterizer.game_server import game_server

router = APIRouter()
templates = Jinja2Templates(directory="templates")

@router.get("/", response_class=HTMLResponse)
async def get_game(request: Request):
    return templates.TemplateResponse("map_rasterizer.html", context={"request": request})


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await game_server.connect(websocket)
    try:
        while True:
            # Wait for any messages from the player
            data = await websocket.receive_text()
            await game_server.handle_message(websocket, data)
    except WebSocketDisconnect:
        game_server.disconnect(websocket)
