export enum GuessChar {
  Wrong = "w",
  Close = "c", 
  Right = "r",
};
type GuessResponse = {
  data: GuessData,
  message: string,
};
type GuessData = {
  is_valid_word: true,
  result: GuessChar[],
} | { is_valid_word: false };
;

export default class API {
  static async guess(word: string, seed: number): Promise<GuessResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/seed/${encodeURI(String(seed))}/guess/${encodeURI(word)}`);
    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`);
    const data: GuessResponse = await response.json();
    return data;
  }
}
