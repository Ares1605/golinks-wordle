from typing import List, Literal, Union
import random
from datetime import date

class BadWordLength(Exception):
    def __init__(self, word: str):
        self._word = word
    @property
    def word(self) -> str:
        return self._word
class InvalidWord(Exception):
    def __init__(self, word: str):
        self._word = word
    @property
    def word(self) -> str:
        return self._word

class Words:
    _words: List[str] = []

    guess_type = List[Union[Literal['r'], Literal['w'], Literal['c']]]

    @staticmethod
    def get_word(seed: str) -> str:
        # set the random seed based on the date
        random.seed(seed)
        
        # pick a random word from the list, using the seed
        return random.choice(Words._words)
    @staticmethod
    def validate(word: str) -> bool:
        left = 0
        right = len(Words._words) - 1
        
        while left <= right:
            mid = (left + right) // 2
            
            if Words._words[mid] == word:
                return True
            elif Words._words[mid] < word:
                left = mid + 1
            else:
                right = mid - 1
        return False
    @staticmethod
    def guess(word: str, seed: str) -> guess_type:
        if len(word) != 5:
            raise BadWordLength(word)
        if Words.validate(word) is False:
            raise InvalidWord(word)

        result: Words.guess_type = []

        answer_word = Words.get_word(seed)
        for i in range(len(word)):
            char = word[i]
            if answer_word[i] == char:
                result.append('r')
            elif char in answer_word:
                result.append('c')
            else:
                result.append('w')
        return result
    @staticmethod
    def all() -> List[str]:
        return Words._words
    @staticmethod
    def _load_words():
        Words._words = []

        try:
            f = open('./words_sorted.txt', 'r')
            for word in f:
                Words._words.append(word.rstrip()) # rstrip to remove the new line
        except FileNotFoundError:
            Words._words = Words._sort_words()
    @staticmethod
    def _sort_words():
        # read all the words into memory, loaded as a list using splitlines
        with open('words.txt', 'r') as file:
            words = file.read().splitlines()

        # native sorting approach
        words.sort()

        with open('words_sorted.txt', 'w') as file:
            file.write('\n'.join(words))
        return words

Words._load_words()
