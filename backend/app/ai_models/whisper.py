from fastapi import UploadFile

from app.utils.tempfiles import save_upload_to_temp


class WhisperClient:
    def __init__(self) -> None:
        self._model = None
        self._error = None

    def _load(self) -> None:
        if self._model is None:
            try:
                import whisper

                self._model = whisper.load_model("base")
            except Exception as exc:
                self._error = exc
                self._model = None

    async def transcribe(self, file: UploadFile | None = None, url: str | None = None) -> list[dict]:
        self._load()
        if self._model is None:
            return []

        if file:
            temp_path = save_upload_to_temp(file)
        elif url:
            import httpx
            import tempfile
            from pathlib import Path
            suffix = "." + url.split(".")[-1] if "." in url else ".mp4"
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
                async with httpx.AsyncClient() as client:
                    resp = await client.get(url)
                    resp.raise_for_status()
                    tmp.write(resp.content)
                temp_path = Path(tmp.name)
        else:
            return []

        try:
            result = self._model.transcribe(str(temp_path))
        finally:
            temp_path.unlink(missing_ok=True)

        segments = []
        for segment in result.get("segments", []):
            segments.append(
                {
                    "start": float(segment.get("start", 0.0)),
                    "end": float(segment.get("end", 0.0)),
                    "text": segment.get("text", "").strip(),
                }
            )
        return segments
