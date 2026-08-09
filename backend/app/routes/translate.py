from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel

from app.services.translation_service import translate_text
from app.services.cultural_service import adapt_culture
from app.services.audio_service import translate_audio
from app.services.video_service import translate_video
from app.services.document_service import translate_document
from app.utils.files import validate_extension
from app.utils.sanitize import sanitize_text

router = APIRouter()


class TextTranslationRequest(BaseModel):
    text: str
    source_lang: str | None = None
    target_lang: str
    tone: str | None = None


@router.post("/text")
async def translate_text_route(payload: TextTranslationRequest) -> dict:
    clean_text = sanitize_text(payload.text)
    if not clean_text:
        raise HTTPException(status_code=400, detail="Text input is required.")

    raw = translate_text(clean_text, payload.source_lang, payload.target_lang)
    localized = adapt_culture(raw, tone=payload.tone, target_lang=payload.target_lang)

    return {
        "source_lang": payload.source_lang,
        "target_lang": payload.target_lang,
        "localized_text": localized,
    }


@router.post("/audio")
async def translate_audio_route(
    file: UploadFile = File(...),
    target_lang: str = Form("English"),
    voice: str | None = Form(None),
    tone: str | None = Form(None),
) -> dict:
    validate_extension(file.filename, {"mp3", "wav", "m4a", "webm", "ogg"})
    result = await translate_audio(
        file, target_lang=target_lang, voice=voice, tone=tone
    )
    return result


@router.post("/video")
async def translate_video_route(
    file: UploadFile | None = File(None),
    video_url: str | None = Form(None),
    target_lang: str = Form("English"),
    tone: str | None = Form(None),
) -> dict:
    if file:
        validate_extension(file.filename, {"mp4", "mov", "mkv"})
    result = await translate_video(
        file, video_url=video_url, target_lang=target_lang, tone=tone
    )
    return result


@router.post("/document")
async def translate_document_route(
    file: UploadFile = File(...),
    target_lang: str = "English",
) -> dict:
    validate_extension(file.filename, {"pdf", "docx", "txt", "ppt", "pptx"})
    result = await translate_document(file, target_lang=target_lang)
    return result
