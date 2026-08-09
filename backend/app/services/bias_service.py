from app.ai_models.detoxify_model import DetoxifyScanner

scanner = DetoxifyScanner()


def analyze_bias(text: str) -> dict:
    return scanner.analyze(text)
