const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('formPage');
});

app.route('/query_format').get((req, res) => {
    const format = req.query.format;
    let result = false;
    if (format !== undefined) {
        result = true;
    }
    const render_dictionary = {
        'has_format': result,
        'has_format_2' : "unknown"
    };
    console.log('Render Dictionary:', render_dictionary);
    res.render('has_format_template', render_dictionary);
});

app.route('/query_format').post((req, res) => {
    const format2 = req.query.format2;
    let result2 = false;
    if (format2 !== undefined) {
        result2 = true;
    }
    const render_dictionary = {
        'has_format' : "unknown",
        'has_format_2': result2
    };
    console.log('Render Dictionary:', render_dictionary);
    res.render('has_format_template', render_dictionary);
});

const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function () {
        console.log("Express server started");
    }
);
