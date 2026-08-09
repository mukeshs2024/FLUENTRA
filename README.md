# FLUENTRA

FLUENTRA is an AI-powered multilingual localization application focused on translation, cultural adaptation, speech and video localization, document translation, bias detection, and regional formatting.

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Framer Motion, Axios
- Backend: FastAPI (Python)

## Local Development

### Frontend

1. Open a terminal in the project root.
2. Run:

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` in `frontend/.env` if your backend is not running on localhost port 8000.

### Backend

1. Create a virtual environment.
2. Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

3. Run the API server:

```bash
cd backend
uvicorn main:app --reload
```

Create `.env` based on `backend/.env.example` and set `GEMINI_API_KEY` and `SARVAM_API_KEY`.

## API Endpoints

- `POST /translate/text`
- `POST /translate/audio`
- `POST /translate/video`
- `POST /translate/document`
- `POST /localize/currency`
- `POST /localize/date`
- `POST /analyze/bias`

## Notes

- AI integrations are provided as service stubs. Replace the placeholder implementations in `backend/app/ai_models` with production API calls.
- File uploads are validated by extension and routed through the translation pipeline.
- Rate limiting and security headers are enabled by default.
