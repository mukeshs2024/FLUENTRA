import httpx
from fastapi import UploadFile

from app.config.settings import get_settings

# Languages supported by Sarvam's translation (mayura:v1) and TTS (bulbul:v2) APIs.
# These are the only languages the audio pipeline will offer.
SUPPORTED_LANGUAGES: dict[str, str] = {
    "English":   "en-IN",
    "Hindi":     "hi-IN",
    "Bengali":   "bn-IN",
    "Gujarati":  "gu-IN",
    "Kannada":   "kn-IN",
    "Malayalam": "ml-IN",
    "Marathi":   "mr-IN",
    "Odia":      "or-IN",
    "Punjabi":   "pa-IN",
    "Tamil":     "ta-IN",
    "Telugu":    "te-IN",
}

# Voices available in Sarvam's bulbul:v2 TTS model.
SUPPORTED_VOICES: list[dict] = [
    {"id": "meera",     "label": "Meera (Female)"},
    {"id": "pavithra",  "label": "Pavithra (Female)"},
    {"id": "maitreyi", "label": "Maitreyi (Female)"},
    {"id": "anushka",  "label": "Anushka (Female)"},
    {"id": "diya",     "label": "Diya (Female)"},
    {"id": "arvind",   "label": "Arvind (Male)"},
    {"id": "amol",     "label": "Amol (Male)"},
    {"id": "amartya",  "label": "Amartya (Male)"},
    {"id": "neel",     "label": "Neel (Male)"},
    {"id": "vian",     "label": "Vian (Male)"},
]


class SarvamClient:
    """Client for all Sarvam AI endpoints — STT, translate, and TTS.

    This is the *only* model used by the audio translation pipeline.
    No MT5, Whisper, or Gemini calls are made here.
    """

    def __init__(self) -> None:
        self.settings = get_settings()
        self.stt_endpoint       = "https://api.sarvam.ai/speech-to-text"
        self.translate_endpoint = "https://api.sarvam.ai/translate"
        self.tts_endpoint       = "https://api.sarvam.ai/text-to-speech"
        self.stt_model  = "saaras:v2"
        self.tts_model  = "bulbul:v2"
        self.translate_model = "mayura:v1"
        self.default_voice   = "meera"

    # ------------------------------------------------------------------
    # Speech-to-Text
    # ------------------------------------------------------------------

    async def speech_to_text(
        self,
        file: UploadFile,
        language_code: str = "unknown",
    ) -> str:
        """Transcribe an audio file using Sarvam saaras STT."""
        if not self.settings.sarvam_api_key:
            return ""

        headers = {"api-subscription-key": self.settings.sarvam_api_key}
        file.file.seek(0)
        files = {
            "file": (file.filename or "audio.webm", file.file, file.content_type or "audio/webm"),
        }
        data = {
            "model": self.stt_model,
            "language_code": language_code,
        }

        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(
                self.stt_endpoint,
                headers=headers,
                data=data,
                files=files,
            )
            response.raise_for_status()
            payload = response.json()

        return (
            payload.get("text")
            or payload.get("transcript")
            or payload.get("result")
            or ""
        )

    # ------------------------------------------------------------------
    # Translation
    # ------------------------------------------------------------------

    async def translate(
        self,
        text: str,
        source_lang: str,
        target_lang: str,
    ) -> str:
        """Translate text using Sarvam's mayura translation model.

        ``source_lang`` and ``target_lang`` must be BCP-47 codes from
        ``SUPPORTED_LANGUAGES``.
        """
        if not text:
            return ""
        if not self.settings.sarvam_api_key:
            return text

        headers = {
            "api-subscription-key": self.settings.sarvam_api_key,
            "Content-Type": "application/json",
        }
        payload = {
            "input":                text,
            "source_language_code": source_lang,
            "target_language_code": target_lang,
            "model":                self.translate_model,
            "enable_preprocessing": False,
        }

        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.post(
                    self.translate_endpoint,
                    headers=headers,
                    json=payload,
                )
                response.raise_for_status()
                data = response.json()
        except httpx.HTTPError:
            return text

        return (
            data.get("translated_text")
            or data.get("output")
            or data.get("translation")
            or text
        )

    # ------------------------------------------------------------------
    # Text-to-Speech
    # ------------------------------------------------------------------

    async def text_to_speech(
        self,
        text: str,
        target_lang_code: str,
        voice: str | None = None,
    ) -> str:
        """Synthesise speech using Sarvam bulbul TTS.

        ``target_lang_code`` must be a BCP-47 code (e.g. ``"hi-IN"``).
        """
        if not text:
            return ""
        if not self.settings.sarvam_api_key:
            return ""

        headers = {
            "api-subscription-key": self.settings.sarvam_api_key,
            "Content-Type": "application/json",
        }
        payload = {
            "model":                self.tts_model,
            "text":                 text,
            "voice":                voice or self.default_voice,
            "target_language_code": target_lang_code,
        }

        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(self.tts_endpoint, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()

        return (
            data.get("audio_url")
            or data.get("url")
            or data.get("audio")
            or ""
        )

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    def lang_code(self, language_name: str) -> str:
        """Resolve a human-readable language name to its BCP-47 code."""
        return SUPPORTED_LANGUAGES.get(language_name, "en-IN")
