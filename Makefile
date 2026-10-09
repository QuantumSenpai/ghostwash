.PHONY: dev api model warmup

dev:
	sh scripts/dev.sh

api:
	PYTHONPATH=. uvicorn api.app.main:app --port 8000

model:
	PYTHONPATH=. python scripts/download_model.py

warmup:
	PYTHONPATH=. python scripts/warmup.py
