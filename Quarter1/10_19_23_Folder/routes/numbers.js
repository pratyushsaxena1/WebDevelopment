const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/numberform', (req, res) => {
  const formPath = path.join(__dirname, '..', 'views', 'numberForm.html');
  res.sendFile(formPath);
});

router.get('/numberFormRedirect', (req, res) => {
  const number = req.query.num;
  res.redirect(`/numbers/converter/${number}`);
});

router.get('/converter/:number', (req, res) => {
  const {number} = req.params;
  const format = req.query.format;
  const conversions = generateConversions(number);
  if (format === 'json') {
    res.json({ number, conversions });
  } 
  else {
    res.render('numberTemplate', { number, conversions });
  }
});

function generateConversions(number) {
    number = parseInt(number, 10);
    const numberBefore = number - 1;
    const numberAfter = number + 1;
    const binaryValue = number.toString(2);
    return [
      { label: 'Number Before', value: numberBefore },
      { label: 'Number After', value: numberAfter },
      { label: 'Binary', value: binaryValue },
    ];
  }  

module.exports = router;