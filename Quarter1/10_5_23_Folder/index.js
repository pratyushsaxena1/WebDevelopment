const express = require('express')
const app = express()

function requestCallback_01(req,res) {
  res.send('Hello World')
  console.log("You just landed on the main page")
}

function requestCallback_02(req,res) {
  res.send('Hello foo!!')
  console.log("You just landed on the foo page")
}

app.get('/', requestCallback_01 )
app.get('/foo', requestCallback_02 )

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started");
  }
);