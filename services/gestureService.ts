import {
  GestureRecognizer,
  FilesetResolver,
  GestureRecognizerResult
} from "@mediapipe/tasks-vision";

// 1. 변수 선언
let gestureRecognizer: GestureRecognizer | null = null;
let runningMode: "VIDEO" | "IMAGE" = "VIDEO";

// 2. 제스처 인식기 로드 (초기화)
export const createGestureRecognizer = async () => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
        delegate: "GPU",
      },
      runningMode: runningMode,
      numHands: 2, // 양손 인식
    });
    console.log("Gesture Recognizer Loaded");
  } catch (e) {
    console.error("Failed to load Gesture Recognizer", e);
  }
};

// 3. 웹캠에서 제스처 예측 실행
export const predictWebcam = (
  video: HTMLVideoElement,
  lastVideoTime: number
): { result: GestureRecognizerResult | null; time: number } => {
  let startTimeMs = performance.now();

  if (gestureRecognizer && lastVideoTime !== video.currentTime) {
    const time = video.currentTime;
    const result = gestureRecognizer.recognizeForVideo(video, startTimeMs);
    return { result, time };
  }
  return { result: null, time: lastVideoTime };
};

// 4. 인식된 제스처를 한국어(TTS용)로 변환
export function mapGestureToKorean(gestureResults: any) {
  if (!gestureResults || gestureResults.length === 0) {
    return ""; 
  }

  // 인식된 제스처 이름 추출
  const gestures = gestureResults.map((handGestures: any) => 
      handGestures[0] ? handGestures[0].categoryName : 'None'
  );
  
  const gestureKey = gestures.join('|');
  const reversedKey = [...gestures].reverse().join('|');
  const sortedKey = [...gestures].sort().join('|');

  // --- [TTS & 인식률 최적화 매핑] ---
  // * 손이 겹치거나 애매한 동작은 모두 제거
  // * 양손이 떨어져 있어도 명확한 동작 위주
  const mapping: Record<string, string> = {
      // ==========================================
      // 1. 숫자 (가장 정확함)
      // ==========================================
      'Closed_Fist': '영',           // 주먹은 숫자 0
      'Pointing_Up': '하나',
      'Victory': '둘',
      'Three': '셋',
      'Four': '넷',
      'Open_Palm': '다섯',

      // 양손 숫자 (5 + n) - 손이 겹치지 않고 나란히 있어도 인식 잘 됨
      'Open_Palm|Pointing_Up': '여섯',
      'Pointing_Up|Open_Palm': '여섯',
      
      'Open_Palm|Victory': '일곱',
      'Victory|Open_Palm': '일곱',
      
      'Open_Palm|Three': '여덟',
      'Three|Open_Palm': '여덟',
      
      'Open_Palm|Four': '아홉',
      'Four|Open_Palm': '아홉',
      
      'Open_Palm|Open_Palm': '열',   // 혹은 '반갑습니다' (상황에 따라 선택)

      // ==========================================
      // 2. 감정 및 리액션 (양손 분리 동작 위주)
      // ==========================================
      
      // [긍정/부정]
      'Thumb_Up': '좋아요',
      'Thumb_Down': '싫어요',
      'ILoveYou': '사랑해요',

      // [강조 - 양손]
      'Thumb_Up|Thumb_Up': '정말 최고예요',      // 쌍따봉
      'Thumb_Down|Thumb_Down': '절대 안 됩니다', // 쌍비추
      'ILoveYou|ILoveYou': '정말 많이 사랑해요',  // 쌍하트

      // [응원/기념 - 인식률 1티어 동작들]
      'Closed_Fist|Closed_Fist': '화이팅',       // 양주먹 불끈 (손 떨어져 있어도 됨)
      'Victory|Victory': '김치',                // 사진 포즈
      
      // ==========================================
      // 3. 직관적 제스처 (오해 소지 없음)
      // ==========================================
      // 한 손을 들어서 하는 동작들
      'Pointing_Up|Open_Palm': '질문 있습니다',   // 한 손 들고 검지 펴기 (명확함)
  };
  
  // 매핑 우선순위
  if (mapping[gestureKey]) return mapping[gestureKey];
  if (mapping[reversedKey]) return mapping[reversedKey];
  if (mapping[sortedKey]) return mapping[sortedKey];

  return ""; 
}