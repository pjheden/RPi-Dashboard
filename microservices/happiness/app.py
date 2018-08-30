from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import db

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return "hello happiness"

@app.route('/save_happiness', methods=['POST'])
def save_happiness():
    content = request.get_json()
    today = datetime.datetime.now().strftime('%d-%m-%Y')
    resp = db.save_or_update(today, content['value'])
    return jsonify(resp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081)
