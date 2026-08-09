from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import get_settings
from app.middleware.rate_limit import RateLimitMiddleware
from app.middleware.security_headers import SecurityHeadersMiddleware
from app.routes.translate import router as translate_router
from app.routes.localize import router as localize_router
from app.routes.analyze import router as analyze_router
from app.routes.health import router as health_router

settings = get_settings()

app = FastAPI(title="FLUENTRA API", version="0.1.0")

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RateLimitMiddleware, requests_per_minute=settings.rate_limit_rpm)

app.include_router(health_router)
app.include_router(translate_router, prefix="/translate", tags=["translate"])
app.include_router(localize_router, prefix="/localize", tags=["localize"])
app.include_router(analyze_router, prefix="/analyze", tags=["analyze"])
