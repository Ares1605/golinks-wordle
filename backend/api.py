from flask_restful import Resource
from words import Words
from response import Response

class API:
    class Test(Resource):
        def get(self):
            return Response.ok_custom("connected!")
    class GetWords(Resource):
        def get(self):
            return Response.ok(Words.all(), "Words retrieved successfully!")
