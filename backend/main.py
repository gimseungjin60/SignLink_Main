from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import base64
import cv2
import numpy as np
from mediapipe import solutions as mp

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

mp_pose = mp.pose.Pose()


def detect_gestures(landmarks):
    """Return a simple string based on wrist positions."""
    nose_y = landmarks[mp.pose.PoseLandmark.NOSE].y
    left_wrist = landmarks[mp.pose.PoseLandmark.LEFT_WRIST]
    right_wrist = landmarks[mp.pose.PoseLandmark.RIGHT_WRIST]

    # Allow small margin above/below nose and lower the visibility constraint to make detection easier.
    margin = 0.05
    visibility_threshold = 0.4

    left_up = (left_wrist.y < nose_y + margin) and (left_wrist.visibility > visibility_threshold)
    right_up = (right_wrist.y < nose_y + margin) and (right_wrist.visibility > visibility_threshold)

    if left_up and right_up:
        return "양손을 들어 환영 인사를 하고 있어요."
    if left_up:
        return "왼손을 들어 인사했어요."
    if right_up:
        return "오른손을 들어 인사했어요."

    return None


@app.post("/predict")
async def predict(request: Request):
    body = await request.json()
    img_data = base64.b64decode(body["image"])
    np_arr = np.frombuffer(img_data, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    results = mp_pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if results.pose_landmarks:
        message = detect_gestures(results.pose_landmarks.landmark)
        if message:
            return {"text": message}
        return {"text": "포즈는 감지했지만 정의된 동작과 일치하지 않습니다. 조금 더 크게 손을 움직여 주세요."}

    return {"text": "포즈 인식 실패"}
