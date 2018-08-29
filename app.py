from flask import Flask, render_template#, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def dashboard():
    return render_template('dashboard/dashboard.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
