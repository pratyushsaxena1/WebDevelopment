import sqlite3
from flask import Flask, render_template

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('mainPage.html')

@app.route('/getStats/<id>')
def getStatsFunction(id):
    connection = sqlite3.connect('database.db')
    cur = connection.cursor()
    query = "SELECT * FROM characters where c_id == ?"
    data = cur.execute(query, (id,) ).fetchall()
    print(data)
    connection.close()
    return render_template('characters.html', characters=data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)