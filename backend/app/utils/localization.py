from datetime import datetime

try:
    from babel.dates import format_date as babel_format_date
    from babel.numbers import format_currency
except Exception:  # pragma: no cover - optional dependency
    babel_format_date = None
    format_currency = None


def convert_currency(
    amount: float,
    source_currency: str,
    target_currency: str,
    locale: str | None,
) -> tuple[float, str]:
    # Placeholder: integrate ExchangeRate API for live conversion.
    converted = amount
    if format_currency:
        formatted = format_currency(converted, target_currency, locale=locale or "en_US")
    else:
        formatted = f"{converted:.2f} {target_currency}"
    return converted, formatted


def format_date(date_value: str, locale: str) -> str:
    try:
        parsed = datetime.fromisoformat(date_value)
    except ValueError:
        parsed = datetime.strptime(date_value, "%m/%d/%Y")
    if babel_format_date:
        return babel_format_date(parsed.date(), locale=locale)
    return parsed.strftime("%d-%m-%Y")
