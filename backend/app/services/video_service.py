from fastapi import UploadFile

from app.ai_models.whisper import WhisperClient
from app.services.translation_service import translate_text
from app.services.cultural_service import adapt_culture
from app.utils.subtitles import build_srt

whisper = WhisperClient()


async def translate_video(
    file: UploadFile | None = None,
    video_url: str | None = None,
    target_lang: str = "English",
    tone: str | None = None,
) -> dict:
    """Transcribe, translate, culturally adapt video segments and build SRT.

    Cultural adaptation is derived from ``target_lang`` — no explicit region
    parameter required.
    """
    if not file and not video_url:
        return {"error": "Either file or video_url must be provided"}

    segments = await whisper.transcribe(file, url=video_url)
    translated_segments = []
    for segment in segments:
        localized = adapt_culture(
            translate_text(segment["text"], source_lang=None, target_lang=target_lang),
            tone=tone,
            target_lang=target_lang,
        )
        translated_segments.append({**segment, "text": localized})

    srt_text = build_srt(translated_segments)
    return {
        "segments": translated_segments,
        "srt": srt_text,
    }
