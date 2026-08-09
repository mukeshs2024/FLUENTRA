from fastapi import APIRouter
from pydantic import BaseModel

from app.services.localization_service import localize_currency, localize_date

router = APIRouter()


class CurrencyRequest(BaseModel):
    amount: float
    source_currency: str
    target_currency: str
    locale: str | None = None


class DateRequest(BaseModel):
    date_value: str
    locale: str


@router.post("/currency")
async def localize_currency_route(payload: CurrencyRequest) -> dict:
    return localize_currency(payload)


@router.post("/date")
async def localize_date_route(payload: DateRequest) -> dict:
    return localize_date(payload)
