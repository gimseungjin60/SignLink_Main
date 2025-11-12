
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai' | 'system';
}

export type Screen = "home" | "translate" | "profile";
