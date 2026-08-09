def build_srt(segments: list[dict]) -> str:
    lines = []
    for index, segment in enumerate(segments, start=1):
        start = _format_time(segment["start"])
        end = _format_time(segment["end"])
        lines.append(str(index))
        lines.append(f"{start} --> {end}")
        lines.append(segment["text"])
        lines.append("")
    return "\n".join(lines)


def _format_time(seconds: float) -> str:
    millis = int(seconds * 1000)
    hours = millis // 3_600_000
    minutes = (millis % 3_600_000) // 60_000
    secs = (millis % 60_000) // 1000
    ms = millis % 1000
    return f"{hours:02}:{minutes:02}:{secs:02},{ms:03}"
