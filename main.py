import os
import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routers import map_rasterizer

app = FastAPI(title="Map Rasterizer Game")

# Mount static files (CSS/JS)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include our game router
app.include_router(map_rasterizer.router)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
