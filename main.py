import os
from fastapi import FastAPI, APIRouter, Request, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv # 1. Import the dotenv loader
from services.map_rasterizer.game_server import game_server

# 2. Load the variables from your .env file
load_dotenv()

app = FastAPI()
router = APIRouter()
templates = Jinja2Templates(directory="templates")

# @router.get("/", response_class=HTMLResponse)
# async def get_game(request: Request):
#     token = request.query_params.get("token")
    
#     # # 3. Check if your .env file says it's okay to skip the token check locally
#     # bypass_auth = os.getenv("AUTH_BYPASS_LOCAL", "False").lower() == "true"
    
#     # if not token and not bypass_auth:
#     if not token:
#         return RedirectResponse(url="https://landing-page-xlpu.onrender.com")
        
#     # return templates.TemplateResponse(request, "map_rasterizer.html", {"token": token or "local-test-token"})
#     return templates.TemplateResponse(request, "map_rasterizer.html", {"token": token})


@router.get("/", response_class=HTMLResponse)
async def get_game(request: Request):

    return templates.TemplateResponse(request, "map_rasterizer.html")



app.include_router(router)
