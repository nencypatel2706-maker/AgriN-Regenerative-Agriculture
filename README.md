# AgriN — Regenerative Agricultural Intelligence

Render-ready hackathon MVP: FastAPI backend + responsive frontend + Gemini AI.

## Deploy on Render

1. Upload this project to a GitHub repository.
2. In Render, choose **New → Blueprint** and select the repository.
3. Render will read `render.yaml` and create the web service.
4. In the service environment variables, add:
   - `GEMINI_API_KEY` = your Gemini API key
5. Deploy.
6. Open the generated `https://...onrender.com` URL.

The service uses Render's `$PORT` automatically and exposes `/api/health` for health checks.

## Local run

```bash
pip install -r requirements.txt
```

Create `.env`:

```env
GEMINI_API_KEY=your_key_here
```

Start:

```bash
uvicorn main:app --host 0.0.0.0 --port 8080
```

Open `http://127.0.0.1:8080`.

## Included features

- Dashboard
- Gemini agricultural chat
- Multimodal crop disease assessment
- Regenerative advisory generation
- Cooperation Hub concept
- Responsive farmer-friendly UI

> Demo soil/weather values are clearly labeled as demo values until connected to verified live data sources.
