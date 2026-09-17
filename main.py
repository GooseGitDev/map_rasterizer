from fastapi import APIRouter, Request, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from services.map_rasterizer.game_server import game_server

router = APIRouter()
templates = Jinja2Templates(directory="templates")

@router.get("/", response_class=HTMLResponse)
async def get_game(request: Request):
    # Intercept the single-sign-on token passing through the query array parameter
    token = request.query_params.get("token")
    
    if not token:
        # Boot unauthenticated stray users instantly out back to the homepage login panel
        return RedirectResponse(url="https://onrender.com")
        
    # Python 3.14 Bypassed Syntax - Pass positional items strictly across order definitions
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
