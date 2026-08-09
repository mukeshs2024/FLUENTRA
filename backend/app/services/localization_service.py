from app.utils.localization import convert_currency, format_date


def localize_currency(payload) -> dict:
    amount, formatted = convert_currency(
        amount=payload.amount,
        source_currency=payload.source_currency,
        target_currency=payload.target_currency,
        locale=payload.locale,
    )
    return {
        "amount": amount,
        "formatted": formatted,
    }


def localize_date(payload) -> dict:
    return {"formatted": format_date(payload.date_value, payload.locale)}
