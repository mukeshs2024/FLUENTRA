import httpx

from app.config.settings import get_settings


class GeminiAdapter:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.endpoint = (
            "https://generativelanguage.googleapis.com/v1beta/"
            "models/gemini-1.5-flash:generateContent"
        )

    def adapt(
        self,
        text: str,
        tone: str | None = None,
        region: str | None = None,
        target_lang: str | None = None,
    ) -> str:
        """Culturally adapt translated text using Gemini.

        Cultural context is derived from ``target_lang`` when ``region`` is
        not supplied.  This makes the API surface language-centric and avoids
        the need for an explicit region parameter.
        """
        if not text:
            return ""
        if not self.settings.gemini_api_key:
            return text

        # Derive cultural context: prefer explicit region, fall back to language
        cultural_context = region or target_lang or "the target audience"

        system_prompt = (
            "You are a senior localization expert. Rewrite the provided text so it "
            "resonates naturally with the cultural norms, idioms, and sensitivities of "
            f"the {cultural_context} community. Preserve the original meaning exactly. "
            "Do NOT translate — only adapt cultural references, idioms, and phrasing."
        )
        tone_hint = f"Tone: {tone}." if tone else ""
        user_prompt = f"{tone_hint} Text to culturally adapt:\n{text}".strip()

        payload = {
            "contents": [
                {"role": "user", "parts": [{"text": system_prompt}]},
                {"role": "user", "parts": [{"text": user_prompt}]},
            ]
        }

        try:
            response = httpx.post(
                self.endpoint,
                params={"key": self.settings.gemini_api_key},
                json=payload,
                timeout=30,
            )
            response.raise_for_status()
        except httpx.HTTPError:
            return text

        data = response.json()
        candidates = data.get("candidates", [])
        if not candidates:
            return text
        parts = candidates[0].get("content", {}).get("parts", [])
        if not parts:
            return text
        return parts[0].get("text", text).strip()
