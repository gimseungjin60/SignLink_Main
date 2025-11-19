import {
  GestureRecognizer,
  FilesetResolver,
  GestureRecognizerResult
} from "@mediapipe/tasks-vision";

let gestureRecognizer: GestureRecognizer | null = null;
let runningMode: "VIDEO" | "IMAGE" = "VIDEO";

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
      numHands: 2,
    });
    console.log("Gesture Recognizer Loaded");
  } catch (e) {
    console.error("Failed to load Gesture Recognizer", e);
  }
};

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

export function mapGestureToKorean(gestureResults: any) {
  if (!gestureResults || gestureResults.length === 0) {
      return "인식된 수어 없음";
  }

  const gestures = gestureResults.map((handGestures: any) => 
      handGestures[0] ? handGestures[0].categoryName : 'None'
  );
  
  const gestureKey = gestures.sort().join('|');

  const mapping: Record<string, string> = {
      'Open_Palm': '나',       
      'Closed_Fist': '너',     
      'Pointing_Up': '가다',   
      'Thumb_Up': '좋다',      
      'Victory': '우리',       
      'ILoveYou': '사랑',      
      'Thumb_Down': '싫다',    
      'None': '',              

      'Five': '안녕하세요',    
      'Four': '언제',         
      'Three': '셋',          
      'Two': '질문',          
      'One': '하나',          

      'Closed_Fist|Closed_Fist': '같이',
      'Open_Palm|Open_Palm': '만나다',
      'Open_Palm|Closed_Fist': '안녕',
      'Open_Palm|Victory': '학교', 
      'Open_Palm|Thumb_Up': '돕다',
      
      'Victory|Victory': '재미',
      'ILoveYou|ILoveYou': '고맙다',
      'Thumb_Up|Closed_Fist': '최고다',
      'Open_Palm|Pointing_Up': '말하다',

      'Closed_Fist|None': '너',
      'None|Closed_Fist': '너',
      'Open_Palm|None': '나',
      'None|Open_Palm': '나',
      'None|Pointing_Up': '가다',
      'Pointing_Up|None': '가다',
      'None|ILoveYou': '사랑',
      'ILoveYou|None': '사랑',
      'None|Thumb_Up': '좋다',
      'Thumb_Up|None': '좋다',
  };
  
  return mapping[gestureKey] || mapping[gestures.join('|')] || `[${gestureKey} - 매핑 필요]`;
}