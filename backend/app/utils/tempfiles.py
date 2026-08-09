from pathlib import Path
from tempfile import NamedTemporaryFile

from fastapi import UploadFile


def save_upload_to_temp(file: UploadFile) -> Path:
    suffix = ""
    if file.filename and "." in file.filename:
        suffix = "." + file.filename.rsplit(".", 1)[-1]
    with NamedTemporaryFile(delete=False, suffix=suffix) as temp:
        file.file.seek(0)
        temp.write(file.file.read())
        return Path(temp.name)