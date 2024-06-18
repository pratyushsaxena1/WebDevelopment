from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    print('someone landing on the page')
    return 'Hello, World!'

@app.route('/test')
def test():
    return 'test'

@app.route('/tictactoe')
def tictactoe():
    return render_template('Copy_SaxenaPratyush_TicTacToe.html')
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)