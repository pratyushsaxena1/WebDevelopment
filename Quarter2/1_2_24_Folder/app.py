from flask import Flask, render_template, make_response

app = Flask(__name__)

@app.route('/' )
def cookiepage():
   resp = make_response(render_template('page_1.html'))
   resp.set_cookie('myCookie', 'cookievalueyay')
   resp.set_cookie('anotherCookie', 'differentcookievalue')
   return resp

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)