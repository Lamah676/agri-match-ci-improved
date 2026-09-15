"""FastAPI main application"""
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from dotenv import load_dotenv

load_dotenv()

# Health check endpoint
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting Agri-Match API...")
    yield
    # Shutdown
    print("💤 Shutting down Agri-Match API...")

app = FastAPI(
    title="🌾 Agri-Match CI API",
    description="Plateforme agricole intelligente",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS Configuration
allowed_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000,http://localhost:8000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "*.vercel.app"]
)

# Health Check
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "agri-match-ci",
        "version": "1.0.0"
    }

# API Routes will be included here
@app.get("/")
async def root():
    return {
        "message": "🌾 Agri-Match CI API v1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
