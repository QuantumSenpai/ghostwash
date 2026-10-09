trap 'kill 0' INT TERM EXIT
PYTHONPATH=. uvicorn api.app.main:app --port 8000 &
(cd web && pnpm dev) &
wait
