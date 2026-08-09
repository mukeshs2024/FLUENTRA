from app.ai_models.gemini import GeminiAdapter

adapter = GeminiAdapter()


def adapt_culture(
    text: str,
    tone: str | None = None,
    target_lang: str | None = None,
) -> str:
    """Culturally adapt ``text`` for the given target language using Gemini.

    Cultural context is inferred from ``target_lang`` so no explicit region
    parameter is needed.
    """
    return adapter.adapt(text=text, tone=tone, target_lang=target_lang)
