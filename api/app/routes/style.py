from fastapi import APIRouter

from core.style import save_style

from ..schemas import StyleIn

router = APIRouter()


@router.post("/style", status_code=201)
def create_style(body: StyleIn):
    save_style(body.name, body.text)
    return {"name": body.name}
