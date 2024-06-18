const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const { spawn } = require('child_process');

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('login');
});

app.get('/home', function (req, res) {
    const { email } = req.session;
    res.render('home', { email });
});

app.get('/signup', function (req, res) {
    res.render('signup');
});

app.get('/updateportfolio', function (req, res) {
    const { email } = req.session;
    res.render('updateportfolio', { email });
});

app.get('/investmenthistory', function (req, res) {
    const { email } = req.session;
    const connection = new sqlite3.Database('user_information.db');
    connection.all("SELECT stock, amount FROM user_information WHERE email = ?", [email], (err, rows) => {
        if (err) {
            console.error(`Error executing SQL query for investmenthistory: ${err.message}`);
            res.status(500).send('Internal Server Error');
            connection.close();
            return;
        }
        const stocks = rows.map(row => ({ stock: row.stock, amount: row.amount }));
        res.render('investmenthistory', { stocks });
        connection.close();
    });
});

app.get('/explorestocks', function (req, res) {
    res.render('explorestocks');
});

function runPythonScript(stockSymbol) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['./static/python/StockWebScraper.py', stockSymbol.toLowerCase()]);
        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error in Python script: ${data}`);
            reject(data.toString());
        });
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(result);
            } else {
                reject(`Python script exited with code ${code}`);
            }
        });
    });
}

app.get('/runPythonScript', async (req, res) => {
    const stockSymbol = req.query.symbol;
    if (!stockSymbol) {
        return res.status(400).json({ error: 'Stock symbol not provided' });
    }
    try {
        const stockData = await runPythonScript(stockSymbol);
        res.status(200).json(stockData);
    } catch (error) {
        console.error('Error in Python script:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/insert_login', (req, res) => {
    const connection = new sqlite3.Database('login.db');
    const { email, pw } = req.body;
    connection.run("INSERT INTO login_info(email, pw) VALUES (?, ?)", [email, pw], (err) => {
        if (err) {
            console.error(`Error executing SQL query for login_info: ${err.message}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        req.session.email = email;
        res.redirect('/home');
    });
    connection.close();
});

app.post('/insert_stock_information', (req, res) => {
    const connection = new sqlite3.Database('user_information.db');
    const { stock, amount } = req.body;
    const { email } = req.session;
    connection.run("INSERT INTO user_information(email, stock, amount) VALUES (?, ?, ?)", [email, stock, amount], (err) => {
        if (err) {
            console.error(`Error executing SQL query for user_information: ${err.message}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.redirect('/home');
    });
    connection.close();
});

app.post('/get_user_information', (req, res) => {
    const connection = new sqlite3.Database('login.db');
    const connection2 = new sqlite3.Database('user_information.db');
    const { email, pw } = req.body;
    connection.get("SELECT email FROM login_info WHERE email = ? AND pw = ?", [email, pw], (err, row) => {
        if (err) {
            console.error(`Error executing SQL query for get_user_information: ${err.message}`);
            res.status(500).send('Internal Server Error');
            connection.close();
            connection2.close();
            return;
        }
        if (row) {
            req.session.email = email;
            connection2.get("SELECT stock, amount FROM user_information WHERE email = ?", [email], (err2, row2) => {
                if (err2) {
                    console.error(`Error executing SQL query for user_information: ${err2.message}`);
                    res.status(500).send('Internal Server Error');
                    connection.close();
                    connection2.close();
                    return;
                }
                res.render('home', { email, stocks: row2 ? [{ stock: row2.stock, amount: row2.amount }] : [] });
                connection2.close();
            });
        } else {
            res.status(404).send('User not found');
            connection2.close();
        }
        connection.close();
    });
});

const listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function () {
    console.log(`Express server started at http://localhost:${listener.address().port}/`);
});