const express = require('express')
const app = express()

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

app.set('view engine', 'ejs')

function sqlPromise(query, params) {
    return new Promise( (resolve,reject) => {
      db.all(query, params, (err,rows) => {
        if (err) reject(err);
        resolve(rows);
      })
    })
  }

app.get('/', async (req,res) => {

  let sqlquery = 'SELECT * FROM characters';
  let results = await sqlPromise(sqlquery);

  let dictionary_out = {
    'results' : results
  }
  res.render('characters', dictionary_out)
})

app.get('/characters/:c_name', async (req,res) => {
  const {c_name} = req.params;

  let sqlquery = 'SELECT * FROM characters WHERE c_name=(?)';
  let sqlparams = [c_name];
  let results = await sqlPromise(sqlquery, sqlparams);

  let dictionary_out = {
    'results' : results
  }
  res.render('characters', dictionary_out)
})

app.listen(8080,"0.0.0.0", () => {console.log('server started')});