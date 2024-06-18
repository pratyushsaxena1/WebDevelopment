const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const fs = require('fs');
const path = require('path');

const wordsFilePath = path.join(__dirname,'enable1.txt')
const words = fs.readFileSync(wordsFilePath).toString().split('\n')

app.get('/', (req, res) => {
    res.render("home_page");
})

app.get('/getPossibleWords/:green_letters/:yellow_letters', (req, res) => {
    const green_letters = JSON.parse(req.params.green_letters);
    const yellow_letters = JSON.parse(req.params.yellow_letters);
    let curr_possible_words = words;
    let first_iteration = []
    let second_iteration = []
    let third_iteration = []
    for (const element of curr_possible_words) {
        if (element.length === 5) {
            first_iteration.push(element);
        }
    }
    if (green_letters.length !== 0) {
        for (const element of first_iteration) {
            let hasAllCharacters = true;
            for (const letter of Object.entries(green_letters)) {
                for (const character of letter[1]) {
                    if (element[letter[0]] !== character.toLowerCase()) {
                        hasAllCharacters = false;
                        break;
                    }
                }
                if (!hasAllCharacters) {
                    break;
                }
            }
            if (hasAllCharacters) {
                second_iteration.push(element);
            }
        }
    }    
    if (yellow_letters.length != 0) {
        for (const element of second_iteration) {
            let hasAllCharacters = true;
            for (const letter of Object.entries(yellow_letters)) {
                for (const character of letter[1]) {
                    if (!element.includes(character.toLowerCase())) {
                        hasAllCharacters = false;
                        break;
                    }
                }
                if (!hasAllCharacters) {
                    break;
                }
            }
            if (hasAllCharacters) {
                third_iteration.push(element);
            }
        }
        res.json(third_iteration);
    }
    else {
        res.json(second_iteration);
    }
});

app.listen(8080,"0.0.0.0", ()=>{console.log('running')})