// 실제 백엔드나 API 키 없이도 동작하도록 하는 Mock 서비스입니다.
export const translateTextToSign = async (text: string): Promise<string> => {
  console.log("Simulating translation for:", text);
  // 실제 API 호출 대신 시뮬레이션 딜레이
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (text.includes("안녕하세요")) return "안녕하세요 (수어 영상 재생)";
  if (text.includes("반갑습니다")) return "만나서 반갑습니다 (수어 설명)";
  
  return `"${text}"에 대한 수어 표현입니다. (시뮬레이션)`;
};

export const translateSignToText = async (image: string): Promise<string> => {
  console.log("Simulating sign to text...");
  return "수어 인식 결과 (시뮬레이션)";
}