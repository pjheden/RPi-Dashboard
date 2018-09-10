from flask import Flask, request, jsonify
from flask_cors import CORS
import db

app = Flask(__name__)
CORS(app)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8082)
