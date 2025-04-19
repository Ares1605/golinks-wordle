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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=os.getenv('DEVELOPMENT', '0') == '1', use_reloader=False)  # use_reloader=False prevents the app from starting twice
