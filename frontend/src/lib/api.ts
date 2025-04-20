export enum GuessChar {
  Wrong = "w",
  Close = "c", 
  Right = "r",
};
type GuessData = {
  is_valid_word: true,
  result: GuessChar[],
} | { is_valid_word: false };
type GuessResponse = {
  data: GuessData,
  message: string,
};

type RevealData = string;
type RevealResponse = {
  data: RevealData,
  message: string,
};

export default class API {
  static async guess(word: string, seed: number): Promise<GuessResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/seed/${encodeURI(String(seed))}/guess/${encodeURI(word)}`);
    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`);
    const data: GuessResponse = await response.json();
    return data;
  }
  static async reveal(seed: number): Promise<RevealResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/seed/${encodeURI(String(seed))}/reveal`);
    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`);
    const data: RevealResponse = await response.json();
    return data;
  }
}
