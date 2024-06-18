const express = require('express')
const app = express()
app.set('view engine', 'ejs')
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res) => {
    let {viewsCookie} = req.cookies
    myNewCookieValue = Number(viewsCookie);
    myNewCookieValue += 1;
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
    let cookieName = 'viewsCookie'
    res.cookie(cookieName, myNewCookieValue, {
        expires: expirationDate,
    });
    res.render('cookie')
});

app.get('/setinitialcookie', (req, res) => {
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
    let cookieName = 'viewsCookie'
    let cookieData = '1'
    res.cookie(cookieName, cookieData, {
        expires: expirationDate,
    });
    res.render('cookie')
});

app.listen(8080,"0.0.0.0", () => {console.log('server started')});