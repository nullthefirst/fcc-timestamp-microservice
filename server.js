// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// moment package
const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// solutions
app.get('/api/:date?', function (req, res) {
  let responseObj = {};
  if (Date.parse(req.params.date) !== NaN) {
    if (moment(req.params.date) === 'Invalid Date') {
      responseObj['error'] = 'Invalid Date';
    } else {
      responseObj['unix'] = Date.parse(req.params.date);
      responseObj['utc'] = `${moment(req.params.date).format(
        'ddd, DD MMM YYYY HH:mm:ss',
      )} GMT`;
    }
  }
  res.json(responseObj);
});

// listen for requests :)
const port = process.env.PORT || 8080;

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
