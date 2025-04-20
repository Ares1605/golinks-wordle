from flask_restful import Resource
from words import Words, InvalidWord, BadWordLength
from response import Response

class API:
    class Test(Resource):
        def get(self):
            return Response.ok_custom("connected!")
    class GetWords(Resource):
        def get(self):
            return Response.ok(Words.all(), "Words retrieved successfully!")
    class Guess(Resource):
        def get(self, seed: str, word: str):
            try:
                return Response.ok({
                    'is_valid_word': True,
                    'result': Words.guess(word, seed),
                }, 'Successfully evaluated the guess.')
            except BadWordLength as e:
                return Response.bad_request(f'Expected a word of length 5, got length {len(e.word)}')
            except InvalidWord:
                return Response.ok({
                    'is_valid_word': False
                }, "Uh-oh, the word you requested a guess with isn't a valid word!")
    class Reveal(Resource):
        def get(self, seed: str):
            return Response.ok(Words.get_answer(seed), "Seeds word returned")
