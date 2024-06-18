from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def main_page_with_links():
    return render_template('/mainPage.html')

@app.route('/act1/scene1')
def scene_1():
    return render_template('/act1/scene1.html')

@app.route('/act1/scene2')
def scene_2():
    return render_template('/act1/scene2.html')
    
if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 80)