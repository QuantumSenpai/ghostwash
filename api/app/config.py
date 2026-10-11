import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
UPLOADS = ROOT / "data" / "uploads"
OUTPUTS = ROOT / "data" / "outputs"
STYLES = ROOT / "data" / "styles"
MAX_FILE_MB = int(os.getenv("MAX_FILE_MB", "20"))
MAX_TEXT_CHARS = int(os.getenv("MAX_TEXT_CHARS", "200000"))
FILE_TTL_SECONDS = int(os.getenv("FILE_TTL_SECONDS", "86400"))
CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",") if o.strip()]
EXTS = {".txt", ".md", ".markdown", ".docx", ".pdf"}
