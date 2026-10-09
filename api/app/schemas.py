from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field


class JobOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    status: Literal["queued", "running", "done", "error"]
    mode: Literal["rules", "ml"]
    kind: Literal["file", "text"]
    filename: str
    progress: float
    result: dict[str, Any] | None
    error: str | None


class StyleIn(BaseModel):
    name: str = Field(pattern=r"^[\w-]{1,40}$")
    text: str = Field(min_length=200, max_length=20000)
