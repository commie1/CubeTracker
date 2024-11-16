from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)


SOLVES_FILE = 'data/solves.json'


def load_solves():
    if os.path.exists(SOLVES_FILE):
        with open(SOLVES_FILE, 'r') as file:
            return json.load(file)
    else:
        return []

def save_solves(data):
    with open(SOLVES_FILE, 'w') as file:
        json.dump(data, file)

@app.route('/')
def index():
    solves = load_solves()
    return render_template('index.html', solves=solves)

@app.route('/add_solve', methods=['POST'])
def add_solve():
    solve_time = request.form['time']
    scramble = request.form['scramble']
    solves = load_solves()


    solves.append({
        'time': solve_time,
        'scramble': scramble
    })


    save_solves(solves)

    return jsonify(success=True)

if __name__ == '__main__':
    app.run(debug=True)
