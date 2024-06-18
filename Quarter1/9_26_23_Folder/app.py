from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def form_page():
    return render_template('/formPage.html')

@app.route('/results', methods=['GET', 'POST'])
def results_page():
    if request.method == 'GET':
        first_input = request.args.get('first_input')
        second_input = request.args.get('second_input')
        question_input = request.args.get('question_input')
        if question_input == "blue" or question_input == "Blue":
            question_input = "Your answer is correct!"
        else:
            question_input="Your answer is incorrect."
        return render_template('/resultsPage.html', first_input=first_input, second_input=second_input, question_input=question_input)
    if request.method == 'POST':
        question_3_input = request.form.getlist('question_3_input')
        print(question_3_input)
        return render_template('/resultsPage.html', question_3_input=question_3_input)
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)