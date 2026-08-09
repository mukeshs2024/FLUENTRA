from fastapi import HTTPException


def validate_extension(filename: str | None, allowed: set[str]) -> None:
    if not filename or "." not in filename:
        raise HTTPException(status_code=400, detail="Invalid file name.")
    ext = filename.rsplit(".", 1)[-1].lower()
    if ext not in allowed:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {ext}")
