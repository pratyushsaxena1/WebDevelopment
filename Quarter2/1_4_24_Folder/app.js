const express = require('express')
const app = express()
app.set('view engine', 'ejs')

const cookieSessionModule = require('cookie-session');

const cookieInitializationParams = {
    name: 'pratyush_session_cookie',
    keys: ['ASFS7897dSDF8jfkSlkDSD8909812321345SDd'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}

const cookieSessionMiddleware = cookieSessionModule(cookieInitializationParams)
app.use(cookieSessionMiddleware)


app.get('/', (req,res) => {
    let {visits} = req.session;
    visits ||= 0;
    req.session.visits = visits;
    req.session.visits += 1;
    if (req.session.visits > 5) {
        res.render('blockpage')
    }
    else {
        res.render('premiumpage')
    }
})

app.get('/login', (req,res) => {
    let {loginstatus} = req.session;
    loginstatus ||= true;
    req.session.loginstatus = loginstatus;
    res.render('premiumpage')
})

app.get('/logout', (req,res) => {
    res.redirect('/')
})


app.listen(80,"0.0.0.0", ()=>{console.log('running')})