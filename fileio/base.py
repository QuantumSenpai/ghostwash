from dataclasses import dataclass, field
from pathlib import Path


@dataclass(slots=True)
class Doc:
    units: list
    kind: str
    skip: set = field(default_factory=set)
    meta: dict = field(default_factory=dict)


def load(path):
    path = Path(path)
    ext = path.suffix.lower()
    if ext in (".txt", ".md", ".markdown"):
        from . import txt_md as m
    elif ext == ".docx":
        from . import docx_io as m
    elif ext == ".pdf":
        from . import pdf_in as m
    else:
        raise ValueError(f"unsupported file type: {ext}")
    doc = m.read(path)
    doc.meta["src"] = str(path)
    return doc


def save(doc, units, out):
    out = Path(out)
    ext = out.suffix.lower()
    if ext == ".pdf":
        from .pdf_out import write
    elif ext == ".docx" and doc.kind == "docx":
        from .docx_io import write
    elif ext == ".docx":
        from .docx_io import write_new as write
    else:
        from .txt_md import write
    write(doc, units, out)
    return out
