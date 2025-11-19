import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { Message } from '../types';
import { translateTextToSign } from '../services/geminiService';
import { createGestureRecognizer, predictWebcam, mapGestureToKorean } from '../services/gestureService';
import { CameraIcon, IoHandLeftOutline } from '../constants';
import p5 from 'p5';

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [9, 10], [10, 11], [11, 12],
  [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20],
  [5, 9], [9, 13], [13, 17],
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '기타 검사 받으러 왔어요.', sender: 'user' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [signDescription, setSignDescription] = useState('김수화님! 무엇을 도와드릴까요?');
  const [videoQueue, setVideoQueue] = useState<string[]>([]);
  const activeVideo = videoQueue[0] ?? null;

  const [currentSentence, setCurrentSentence] = useState("");
  const [currentGestureText, setCurrentGestureText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const p5ContainerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    createGestureRecognizer();
  }, []);

  const enqueueVideosFromText = useCallback((text: string) => {
    const normalized = text.replace(/\s+/g, ' ').trim();
    const additions: string[] = [];
    if (normalized.includes('안녕하세요')) additions.push('hello');
    if (normalized.includes('배부르네요')) additions.push('full');
    if (!additions.length) return;
    setVideoQueue(prev => [...prev, ...additions]);
  }, []);

  const handleVideoEnded = useCallback(() => {
    setVideoQueue(prev => prev.slice(1));
  }, []);

  const speakSentence = useCallback((text: string) => {
    if (isSpeaking) return;
    if ('speechSynthesis' in window) {
      console.log(`TTS: Speaking requested for text: "${text}"`);
      setIsSpeaking(true);
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      const koreanVoice = voices.find(voice => voice.lang === 'ko-KR' || voice.lang === 'ko_KR');
      if (koreanVoice) utterance.voice = koreanVoice;

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        console.error('SpeechSynthesis Error:', event);
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
    } else {
      alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
    }
  }, [isSpeaking]);

  const Sketch = (p: p5) => {
    let capture: p5.Element;
    let lastVideoTime = -1;
    let results: any = null;

    p.setup = () => {
      const w = p5ContainerRef.current ? p5ContainerRef.current.offsetWidth : 640;
      const h = p5ContainerRef.current ? p5ContainerRef.current.offsetHeight : 480;
      p.createCanvas(w, h);

      capture = p.createCapture({
        audio: false,
        video: { facingMode: "user" }
      });
      capture.elt.setAttribute("playsinline", "");
      capture.hide();
    };

    p.draw = () => {
      p.background(255);
      
      if (capture && capture.width > 0) {
        const canvasRatio = p.width / p.height;
        const videoRatio = capture.width / capture.height;
        let drawW, drawH;

        if (canvasRatio > videoRatio) {
            drawH = p.height;
            drawW = p.height * videoRatio;
        } else {
            drawW = p.width;
            drawH = p.width / videoRatio;
        }
        
        p.push();
        p.translate(p.width, 0);
        p.scale(-1, 1); 
        const x = (p.width - drawW) / 2;
        const y = (p.height - drawH) / 2;
        p.image(capture, x, y, drawW, drawH);
        p.pop();

        if (capture.elt.readyState >= 2) {
             const prediction = predictWebcam(capture.elt, lastVideoTime);
             results = prediction.result;
             lastVideoTime = prediction.time;
        }

        if (results && results.landmarks) {
             if (results.gestures && results.gestures.length > 0) {
                 const gestureText = mapGestureToKorean(results.gestures);
                 setCurrentGestureText(gestureText);
             } else {
                 setCurrentGestureText("");
             }

             for (const landmarks of results.landmarks) {
                 drawHandSkeleton(p, landmarks, (p.width - drawW) / 2, (p.height - drawH) / 2, drawW / capture.width);
             }
        }
      }
    };
    
    p.windowResized = () => {
        if (p5ContainerRef.current) {
            p.resizeCanvas(p5ContainerRef.current.offsetWidth, p5ContainerRef.current.offsetHeight);
        }
    };

    function drawHandSkeleton(p: p5, hand: any[], offsetX: number, offsetY: number, scale: number) {
        p.push();
        p.translate(p.width, 0); 
        p.scale(-1, 1); 
        p.translate(offsetX, offsetY);
        p.scale(scale); 

        p.stroke(0, 255, 0);
        p.strokeWeight(2);
        for (const connection of CONNECTIONS) {
            const p1 = hand[connection[0]];
            const p2 = hand[connection[1]];
            p.line(p1.x * capture.width, p1.y * capture.height, p2.x * capture.width, p2.y * capture.height);
        }

        p.noStroke();
        p.fill(255, 0, 0);
        for (const point of hand) {
            p.circle(point.x * capture.width, point.y * capture.height, 8); 
        }
        p.pop();
    }
  };

  const handleToggleWebcam = useCallback(() => {
    if (isWebcamOn) {
      setIsWebcamOn(false);
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
      setSignDescription("김수화님! 무엇을 도와드릴까요?");
    } else {
      setIsWebcamOn(true);
      setSignDescription("카메라가 켜졌습니다. 수어를 시작하세요.");
    }
  }, [isWebcamOn]);

  useEffect(() => {
    if (isWebcamOn && p5ContainerRef.current && !p5Instance.current) {
        p5Instance.current = new p5(Sketch, p5ContainerRef.current);
    }
    return () => {
        if (p5Instance.current && !isWebcamOn) {
            p5Instance.current.remove();
            p5Instance.current = null;
        }
    };
  }, [isWebcamOn]); 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isWebcamOn) return;
        if (e.key === ' ') {
            e.preventDefault();
            if (currentGestureText && currentGestureText !== "인식된 수어 없음") {
                setCurrentSentence(prev => prev + currentGestureText + " ");
                setCurrentGestureText("");
            }
        }
        if (e.key === 'Escape') {
            setCurrentSentence("");
            setCurrentGestureText("");
            if ('speechSynthesis' in window) speechSynthesis.cancel();
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWebcamOn, currentGestureText]);

  const handleCanvasClick = () => {
    if (currentSentence.trim().length > 0 && !isSpeaking) {
        speakSentence(currentSentence.trim());
        setMessages(prev => [...prev, { id: Date.now(), text: currentSentence.trim(), sender: 'user' }]);
        setCurrentSentence("");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const textToTranslate = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { id: Date.now(), text: textToTranslate, sender: 'user' }]);
    enqueueVideosFromText(textToTranslate);

    const description = await translateTextToSign(textToTranslate);
    if (description && !description.toLowerCase().startsWith('error')) {
      if (!description.toLowerCase().startsWith('to sign')) {
        setSignDescription(description);
      }
    } else {
      setSignDescription('AI가 잠시 응답하지 않아요. 다시 시도해 주세요.');
    }
  };

  const videoSources: Record<string, { webm: string; mp4: string; ogv: string }> = {
    hello: {
      webm: "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191021/629456/MOV000257117_700X466.webm",
      mp4: "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191021/629456/MOV000257117_700X466.mp4",
      ogv: "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191021/629456/MOV000257117_700X466.ogv",
    },
    full: {
      webm: "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631916/MOV000244936_700X466.webm",
      mp4: "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631916/MOV000244936_700X466.mp4",
      ogv: "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631916/MOV000244936_700X466.ogv",
    },
  };

  return (
    <div className="flex-1 flex flex-col bg-[#e5e7eb] overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-gray-300 bg-white">
            <div className="text-sm">
                <span className="text-gray-500">SignLink</span>
                <span className="text-gray-400 mx-2">&gt;</span>
                <span className="font-semibold text-gray-800">수어 통역 채팅</span>
            </div>
        </div>
        
        <main className="flex-1 flex gap-4 p-4 overflow-hidden">
            <div className="w-1/2 flex flex-col items-center justify-center bg-white rounded-lg p-4 space-y-4 relative">
                <div 
                    className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center w-full cursor-pointer"
                    onClick={isWebcamOn ? handleCanvasClick : undefined}
                >
                    {isWebcamOn ? (
                        <div ref={p5ContainerRef} className="w-full h-full" />
                    ) : (
                        activeVideo && videoSources[activeVideo] ? (
                            <video
                                key={activeVideo}
                                id="html5VideoPreview"
                                controls
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                                onEnded={handleVideoEnded}
                            >
                                <source src={videoSources[activeVideo].webm} type="video/webm" />
                                <source src={videoSources[activeVideo].mp4} type="video/mp4" />
                            </video>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-blue-600 space-y-2">
                                <IoHandLeftOutline className="w-20 h-20" />
                                <p className="text-base font-semibold text-gray-700">카메라 버튼을 눌러 통역 시작</p>
                            </div>
                        )
                    )}

                    <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
                        <button onClick={handleToggleWebcam} className="p-2 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-opacity">
                            <CameraIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="w-full">
                    {isWebcamOn ? (
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center space-y-2">
                            <p className="text-sm text-gray-500">
                                현재 인식: <span className="font-bold text-blue-600 text-lg">{currentGestureText || "-"}</span>
                            </p>
                            <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm min-h-[3.5rem] flex items-center justify-center">
                                <span className="text-xl font-semibold text-gray-800">{currentSentence || "문장을 만드는 중..."}</span>
                            </div>
                            <div className="flex justify-center gap-4 text-xs text-gray-400 mt-2">
                                <span>␣（Speac Bar)를 눌러 단어 저장 및 추가</span><p></p>
                                <span>화면을 🖱️클릭하여 음성으로 듣기</span>
                                <span>ESC 초기화</span>
                            </div>
                            {isSpeaking && <p className="text-xs text-red-500 font-semibold animate-pulse">🔊 음성 변환 중...</p>}
                        </div>
                    ) : (
                        <div className="w-full flex justify-center">
                            <div className="bg-white rounded-3xl px-6 py-3 shadow-sm relative text-center border border-gray-100">
                                <p className="text-gray-800 font-medium">{signDescription}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-1/2 flex flex-col bg-white rounded-lg overflow-hidden border border-gray-300">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map(msg => (
                        <div key={msg.id} className="flex justify-end">
                            <div className="max-w-sm px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                <div className="p-2 bg-white border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="relative flex items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="메시지 입력..."
                            className="w-full p-3 pr-12 border-none bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                        <button type="submit" className="absolute right-2 p-2 text-gray-500 hover:text-blue-600 rounded-full transition-colors">
                            <CameraIcon className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            </div>
        </main>
    </div>
  );
};

export default ChatInterface;