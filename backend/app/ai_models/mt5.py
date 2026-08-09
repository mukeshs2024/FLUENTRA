class Mt5Translator:
    def __init__(self) -> None:
        self._ready = False
        self._pipeline = None
        self._error = None

    def _load(self) -> None:
        if self._ready:
            return
        try:
            from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline

            model_name = "google/mt5-small"
            tokenizer = AutoTokenizer.from_pretrained(model_name)
            model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
            self._pipeline = pipeline(
                "text2text-generation", model=model, tokenizer=tokenizer
            )
        except Exception as exc:
            self._error = exc
            self._pipeline = None
        self._ready = True

    def translate(self, text: str, source_lang: str | None, target_lang: str) -> str:
        if not text:
            return ""
        self._load()
        if self._pipeline is None:
            return text
        source = source_lang or "auto"
        if source.lower() in {"auto", "auto detect", "unknown"}:
            prompt = f"translate to {target_lang}: {text}"
        else:
            prompt = f"translate {source} to {target_lang}: {text}"
        result = self._pipeline(prompt, max_length=512, num_beams=4, do_sample=False)
        return result[0]["generated_text"]
