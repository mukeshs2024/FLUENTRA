class DetoxifyScanner:
    def __init__(self) -> None:
        self._model = None
        self._error = None

    def _load(self) -> None:
        if self._model is None:
            try:
                from detoxify import Detoxify

                self._model = Detoxify("original")
            except Exception as exc:
                self._error = exc
                self._model = None

    def analyze(self, text: str) -> dict:
        if not text:
            return {"summary": "No text provided.", "toxicity": 0.0, "bias": 0.0, "flags": []}
        self._load()
        if self._model is None:
            return {
                "summary": "Detoxify model unavailable.",
                "toxicity": 0.0,
                "bias": 0.0,
                "flags": [],
            }
        scores = self._model.predict(text)
        toxicity = float(scores.get("toxicity", 0.0))
        bias = float(scores.get("identity_attack", 0.0))
        flags = []
        if toxicity > 0.5:
            flags.append("High toxicity")
        if bias > 0.5:
            flags.append("Potential bias")
        summary = "No critical toxicity detected." if not flags else "Review recommended."
        return {
            "summary": summary,
            "toxicity": toxicity,
            "bias": bias,
            "flags": flags,
        }
