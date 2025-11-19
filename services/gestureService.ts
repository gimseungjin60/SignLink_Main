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
  
  // 키 생성 (정방향, 역방향, 정렬)
  const gestureKey = gestures.join('|');
  const reversedKey = [...gestures].reverse().join('|');
  const sortedKey = [...gestures].sort().join('|');

  // --- [사용자 요청 통합 매핑 데이터] ---
  // * 중복된 동작은 리스트 아래쪽에 있는 '의미'가 우선됩니다. (예: 주먹 -> '힘')
  // * 순서가 있는 동작(6 vs 질문)은 손 순서로 구분됩니다.
  const mapping: Record<string, string> = {
      // =============================
      // 1. 숫자 (0~9)
      // =============================
      // 단일 손가락 숫자는 '의미' 매핑에 의해 덮어써질 수 있습니다. (0, 2, 5)
      "Pointing_Up": "1",
      "Three": "3",
      "Four": "4",
      
      // 복합 숫자 (5 + N 방식)
      // * 5(Open_Palm)가 먼저 나오면 숫자로 인식
      "Open_Palm|Pointing_Up": "6",
      "Open_Palm|Victory": "7",
      "Open_Palm|Three": "8",
      "Three|Open_Palm": "8", // 8은 순서 상관없이 8로 (3+5)
      "Open_Palm|Four": "9",
      "Four|Open_Palm": "9",  // 9도 순서 상관없이 9로 (4+5)

      // =============================
      // 2. 감정 (Emotion)
      // =============================
      "Thumb_Up": "좋다",
      "Thumb_Down": "나쁘다",
      "ILoveYou": "사랑",
       
      "Thumb_Up|Thumb_Up": "정말 좋아",
      "Thumb_Down|Thumb_Down": "정말 나빠",
      "ILoveYou|ILoveYou": "많이 사랑",

      "Closed_Fist": "힘",                 // 0 대신 힘
      "Closed_Fist|Closed_Fist": "화이팅", // 0+0 대신 화이팅
       
      "Victory": "기쁘다",                 // 2 대신 기쁘다
      "Victory|Victory": "축하해",         // 22 대신 축하해

      // =============================
      // 3. 의사 표현 (Expression)
      // =============================
      // * 1(Pointing_Up)이나 2(Victory)가 먼저 나오면 의사 표현으로 인식
      "Pointing_Up|Open_Palm": "질문",     // 1 + 5 = 질문 (vs 5 + 1 = 6)
      "Pointing_Up|Pointing_Up": "강조",
      "Open_Palm": "멈춰",                 // 5 대신 멈춰
      "Open_Palm|Open_Palm": "반가워",     // 10 대신 반가워
      "Closed_Fist|Open_Palm": "도와줘",

      // =============================
      // 4. 일상/물건 (Daily)
      // =============================
      "Three|Three": "사람들",
      "Four|Four": "많다",
      "Open_Palm|Thumb_Up": "괜찮아",
      "Victory|Open_Palm": "고마워"        // 2 + 5 = 고마워 (vs 5 + 2 = 7)
  };
  
  // 1. 정확한 순서 매핑 (6 vs 질문, 7 vs 고마워 구분을 위해 가장 중요)
  if (mapping[gestureKey]) return mapping[gestureKey];
  
  // 2. 역순 매핑 (순서가 바뀌어도 되는 것들 - 8, 9, 화이팅 등)
  if (mapping[reversedKey]) return mapping[reversedKey];
  
  // 3. 정렬된 키 (그 외 조합)
  if (mapping[sortedKey]) return mapping[sortedKey];

  return ""; 
}