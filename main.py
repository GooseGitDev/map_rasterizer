# import os
# from fastapi import FastAPI, APIRouter, Request, WebSocket, WebSocketDisconnect, HTTPException
# from fastapi.responses import HTMLResponse, RedirectResponse
# from fastapi.templating import Jinja2Templates
# from dotenv import load_dotenv # 1. Import the dotenv loader
# from services.map_rasterizer.game_server import game_server

# # 2. Load the variables from your .env file
# load_dotenv()

# app = FastAPI()
# router = APIRouter()
# templates = Jinja2Templates(directory="templates")

# # @router.get("/", response_class=HTMLResponse)
# # async def get_game(request: Request):
# #     token = request.query_params.get("token")
    
# #     # # 3. Check if your .env file says it's okay to skip the token check locally
# #     # bypass_auth = os.getenv("AUTH_BYPASS_LOCAL", "False").lower() == "true"
    
# #     # if not token and not bypass_auth:
# #     if not token:
# #         return RedirectResponse(url="https://landing-page-xlpu.onrender.com")
        
# #     # return templates.TemplateResponse(request, "map_rasterizer.html", {"token": token or "local-test-token"})
# #     return templates.TemplateResponse(request, "map_rasterizer.html", {"token": token})


# @router.get("/", response_class=HTMLResponse)
# async def get_game(request: Request):

#     return templates.TemplateResponse(request, "map_rasterizer.html")



# app.include_router(router)









# import os
# from fastapi import FastAPI, APIRouter, Request, WebSocket, WebSocketDisconnect, HTTPException
# from fastapi.responses import HTMLResponse, RedirectResponse
# from fastapi.staticfiles import StaticFiles  # Keep this import
# from fastapi.templating import Jinja2Templates
# from dotenv import load_dotenv

# # Load the variables from your .env file
# load_dotenv()

# app = FastAPI()
# router = APIRouter()

# # 1. Keep the working static mount fix to resolve the MIME type issue
# app.mount("/static", StaticFiles(directory="static"), name="static")

# templates = Jinja2Templates(directory="templates")

# @router.get("/", response_class=HTMLResponse)
# async def get_game(request: Request):
#     response = templates.TemplateResponse(request, "map_rasterizer.html")
    
#     # FORCE THE BROWSER TO SMASH ITS CACHE COMPLETELY
#     response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
#     response.headers["Pragma"] = "no-cache"
#     response.headers["Expires"] = "0"
    
#     return response


# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     # This mounts your imported game server handler natively to catch inbound browser packets
#     await GameServer.connect(websocket)




# app.include_router(router)


















import os
from fastapi import FastAPI, APIRouter, Request, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

# Import your unified live game server instance directly
from services.map_rasterizer.game_server import game_server

# Load environment variables out of your local .env file
load_dotenv()

app = FastAPI()
router = APIRouter()

# 1. Static Assets Router Mount Directory
# Maps physical resource request routing paths to your static folder workspace
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

# 2. Dynamic Web Page Asset Index Router Route Path
@router.get("/", response_class=HTMLResponse)
async def get_game(request: Request):
    response = templates.TemplateResponse(request, "map_rasterizer.html")
    
    # Force the local web browser to completely drop historical JavaScript asset caches
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    
    return response

# 3. Secure Live Engine Handshake WebSocket Endpoint Routing Block
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # Register the raw network socket endpoint connection into your GameServer manager instance
    await game_server.connect(websocket)
    
    try:
        # Keep the pipeline loop alive forever listening for inbound messages from mainClient.js
        while True:
            # Await inbound data packet strings sent across the socket pipeline matrix channels
            data = await websocket.receive_text()
            
            # Feed the inbound packet data string straight down to your server handler routine logic
            await game_server.handle_message(websocket, data)
            
    except WebSocketDisconnect:
        # Handle player drop occurrences cleanly by invoking your cleanup handler
        game_server.disconnect(websocket)
        
    except Exception as e:
        print(f"⚠️ Unexpected Network Engine Socket Exception Encountered: {e}")
        game_server.disconnect(websocket)

# Append all router structures directly to your primary FastAPI core engine app instance space
app.include_router(router)










