from flask import Flask, render_template
import requests
import json

app = Flask(__name__)

@app.route('/')
def hello_requests():
    remote_url = "https://ion.tjhsst.edu/api/schedule?format=json"
    r = requests.get(remote_url)    
    print(r.text)
    j = json.loads(r.text)
    print(j['results'][0]['date'])
    return render_template('foo.html', schedule=j)

app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)