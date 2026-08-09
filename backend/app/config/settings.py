from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    gemini_api_key: str | None = None
    sarvam_api_key: str | None = None
    allowed_origins: list[str] = ["http://localhost:5173"]
    rate_limit_rpm: int = 120

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache
def get_settings() -> Settings:
    return Settings()
