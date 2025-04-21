from app import app
from dotenv import load_dotenv
import os

load_dotenv() # load environment variables from .env file

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))
