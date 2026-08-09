from fastapi import UploadFile

from app.ai_models.ocr import extract_text
from app.services.translation_service import translate_text
from app.services.cultural_service import adapt_culture


async def translate_document(
    file: UploadFile,
    target_lang: str,
    region: str | None,
) -> dict:
    text = extract_text(file)
    translated = translate_text(text, source_lang=None, target_lang=target_lang)
    localized = adapt_culture(translated, region=region, tone=None)
    return {
        "extracted_text": text,
        "localized_text": localized,
        "note": "Document rebuild pipeline should preserve layout.",
    }
