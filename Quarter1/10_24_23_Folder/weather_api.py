from flask import Flask, render_template
import requests
import json

app = Flask(__name__)

@app.route('/')
def hello_requests():
    remote_url = "https://api.weather.gov/gridpoints/MKX/88,65/forecast"
    r = requests.get(remote_url)    
    j = json.loads(r.text)
    return render_template('weather.html', weather=j)

app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)