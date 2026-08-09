from app.ai_models.mt5 import Mt5Translator

translator = Mt5Translator()


def translate_text(text: str, source_lang: str | None, target_lang: str) -> str:
    return translator.translate(text, source_lang=source_lang, target_lang=target_lang)
