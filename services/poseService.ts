const DEFAULT_API_URL = import.meta.env.VITE_POSE_API_URL || 'http://localhost:8000/predict';

export interface PosePredictionResponse {
  text: string;
}

export async function analyzePose(imageBase64: string): Promise<PosePredictionResponse> {
  const response = await fetch(DEFAULT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imageBase64 }),
  });

  if (!response.ok) {
    throw new Error(`Pose API error: ${response.status}`);
  }

  return response.json();
}

