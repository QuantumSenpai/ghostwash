from fastapi import APIRouter

from core.style import list_styles, save_style

from ..schemas import StyleIn

router = APIRouter()


@router.post("/style", status_code=201)
def create_style(body: StyleIn):
    save_style(body.name, body.text)
    return {"name": body.name}


@router.get("/styles")
def get_styles():
    return {"styles": list_styles()}
