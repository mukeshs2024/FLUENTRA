from fastapi import APIRouter
from pydantic import BaseModel

from app.services.bias_service import analyze_bias
from app.utils.sanitize import sanitize_text

router = APIRouter()


class BiasRequest(BaseModel):
    text: str


@router.post("/bias")
async def analyze_bias_route(payload: BiasRequest) -> dict:
    clean_text = sanitize_text(payload.text)
    return analyze_bias(clean_text)
