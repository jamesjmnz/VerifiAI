from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import sys

# Early startup logging to catch issues
print("[STARTUP] Python version:", sys.version)
print("[STARTUP] Starting FastAPI application...")

try:
    from app.api.routes import verification
    print("[STARTUP] Successfully imported verification routes")
except Exception as e:
    print(f"[STARTUP ERROR] Failed to import verification routes: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

app = FastAPI(title="Fake News Verifier API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "running"}

@app.get("/health")
def health():
    return {"status": "ok"}

# Memory optimization: Log model status at startup
@app.on_event("startup")
async def startup_event():
    """Log memory optimization settings at startup."""
    print("[STARTUP] ========================================")
    print("[STARTUP] Application startup successful!")
    print("[STARTUP] Memory optimizations enabled:")
    print(f"[STARTUP] - DISABLE_FAKE_NEWS_MODEL: {os.getenv('DISABLE_FAKE_NEWS_MODEL', 'false')}")
    print(f"[STARTUP] - DISABLE_SEMANTIC_MODEL: {os.getenv('DISABLE_SEMANTIC_MODEL', 'false')}")
    print(f"[STARTUP] - DISABLE_QDRANT: {os.getenv('DISABLE_QDRANT', 'false')}")
    print("[STARTUP] ML models will be loaded lazily when needed (not at startup)")
    print("[STARTUP] ========================================")

@app.on_event("shutdown")
async def shutdown_event():
    """Log shutdown event."""
    print("[SHUTDOWN] Application shutting down...")

app.include_router(verification.router)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
