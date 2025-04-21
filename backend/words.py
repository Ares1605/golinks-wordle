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
    _answers: List[str] = []

    guess_type = List[Union[Literal['r'], Literal['w'], Literal['c']]]

    @staticmethod
    def get_answer(seed: str) -> str:
        # set the random seed based on the date
        random.seed(seed)
        
        # pick a random word from the list, using the seed
        return random.choice(Words._answers)
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
        
        result: Words.guess_type = ['w'] * 5  # init all as wrong
        answer_word = Words.get_answer(seed)
        
        # first pass: mark all correct positions
        for i in range(len(word)):
            if word[i] == answer_word[i]:
                result[i] = 'r'
        
        # second pass: mark remaining letters that are in the word but wrong position
        # keep track of remaining letters in the answer
        remaining_chars = {}
        for i in range(len(answer_word)):
            if answer_word[i] != word[i]:  # skip already matched positions
                remaining_chars[answer_word[i]] = remaining_chars.get(answer_word[i], 0) + 1
        
        # now mark close matches
        for i in range(len(word)):
            if result[i] != 'r' and word[i] in remaining_chars and remaining_chars[word[i]] > 0:
                result[i] = 'c'
                remaining_chars[word[i]] -= 1
                
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
    def _load_answers():
        Words._answers = []

        f = open('./answers.txt', 'r')
        for answer in f:
            Words._answers .append(answer.rstrip()) # rstrip to remove the new line
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
Words._load_answers()
