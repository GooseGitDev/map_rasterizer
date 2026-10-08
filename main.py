from fastapi import FastAPI, APIRouter, Request, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from services.map_rasterizer.game_server import game_server

# 1. Initialize the actual FastAPI application instance here
app = FastAPI()

# 2. Keep your router definition
router = APIRouter()
templates = Jinja2Templates(directory="templates")

@router.get("/", response_class=HTMLResponse)
async def get_game(request: Request):
    token = request.query_params.get("token")
    if not token:
        return RedirectResponse(url="https://onrender.com")
    return templates.TemplateResponse(request, "map_rasterizer.html", {"token": token})

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await game_server.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await game_server.handle_message(websocket, data)
    except WebSocketDisconnect:
        game_server.disconnect(websocket)

# 3. Add this at the very bottom of the file to register your routes into the app
app.include_router(router)
