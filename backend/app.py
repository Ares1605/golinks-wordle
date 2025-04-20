from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from api import API
from dotenv import load_dotenv
import os

load_dotenv() # load environment variables from .env file

app = Flask(__name__)
CORS(app, origins=os.getenv('ALLOWED_ORIGINS', '').split(','))
api = Api(app)

# Server Routing
api.add_resource(API.Test, '/test_connection')
api.add_resource(API.GetWords, '/all_words')
api.add_resource(API.Guess, '/seed/<string:seed>/guess/<string:word>')
api.add_resource(API.GetDailyWord, '/seed/<string:seed>/daily_word')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)), debug=os.getenv('DEVELOPMENT', '0') == '1', use_reloader=False)  # use_reloader=False prevents the app from starting twice
