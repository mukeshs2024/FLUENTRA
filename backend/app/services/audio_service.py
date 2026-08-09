from fastapi import UploadFile

from app.ai_models.sarvam import SarvamClient
from app.services.translation_service import translate_text
from app.services.cultural_service import adapt_culture

sarvam = SarvamClient()


async def translate_audio(
    file: UploadFile,
    target_lang: str,
    voice: str | None = None,
    tone: str | None = None,
) -> dict:
    """Transcribe, translate, culturally adapt, and synthesise speech.

    Cultural adaptation is derived from ``target_lang`` — no explicit region
    parameter required.
    """
    transcript = await sarvam.speech_to_text(file)
    translated = translate_text(transcript, source_lang=None, target_lang=target_lang)
    localized = adapt_culture(translated, tone=tone, target_lang=target_lang)
    audio_url = await sarvam.text_to_speech(localized, target_lang=target_lang, voice=voice)

    return {
        "transcript": transcript,
        "localized_text": localized,
        "audio_url": audio_url,
    }
