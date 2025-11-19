export type Screen = 'home' | 'translate' | 'profile';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}