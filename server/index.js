const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const logger = require('morgan');
const cors = require('cors');
const {PythonShell} = require('python-shell');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(pino);
app.use(logger('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/search', function(req, res) {
  let searchTerm = req.body.searchTerm;
  console.log("SERVER RECEIVED SEARCHTERM:", searchTerm);
  res.json({success: true});
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
