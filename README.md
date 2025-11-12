<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1n_nV2aExuI5M_BGBLng4DffnGCPpw3R0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Pose Detection Backend

The webcam pose recognition feature relies on a FastAPI service that uses MediaPipe and OpenCV.

1. Install Python requirements:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Start the API server:
   ```bash
   uvicorn main:app --reload
   ```
3. (Optional) If you host it elsewhere, set `VITE_POSE_API_URL` in `.env` to the deployed URL.
