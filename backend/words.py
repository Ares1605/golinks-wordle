from typing import List

class Words:
    _words: List[str] = []

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
