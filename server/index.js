const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const logger = require('morgan');
const cors = require('cors');
const {PythonShell} = require('python-shell');
var fs = require('fs');
const path = require('path');

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

app.post('/searchterm', function(req, res) {
  let searchTerm = req.body.search;
  console.log("SERVER RECEIVED SEARCHTERM:", searchTerm);
  res.json({success: true});
})

var bookId;

app.get('/get_books', function(req, res) {
  let books;
  books = [{'title': 'Poukama : uutta luovaa kalastuskulttuuria', 'author': '', 'bibid': '2162373'}, {'title': 'Pohjolan kalastusopas', 'author': '', 'bibid': '1917599'}, {'title': 'Jigikalastus : perustekniikat, jigivalinta, ahven, kuha', 'author': 'Rannisto, Jari, kirjoittaja.',
  'bibid': '2297844'},
  {'title': 'Suomalaisten kalastus. I-III', 'author': 'Sirelius, U. T.', 'bibid': '1922553'}, {'title': 'Suuri suomalainen perhokalastuskirja', 'author': 'Kanerva, Pertti', 'bibid': '2155345'},
  {'title': 'Jousikirja : jousen historia, jousityypit, varusteet, jousiammunnan tekniikka, jousimetsästys, jousikalastus', 'author': 'Hyytinen, Timo, kirjoittaja.' ,'bibid': '2241808'},
  {'title': 'Mäkiluoto : kalastustukikohdasta rannikkolinnakkeeksi',
  'author': 'Enqvist, Ove, kirjoittaja.', 'bibid': '2336503'},
  {'title': 'Kalastus : ammattilaisten salaisuudet helppoina vinkkeinä', 'author': 'Manninen, Ari, kirjoittaja, valokuvaaja.', 'bibid': '2277733'},
  {'title': 'Eränkävijät. Metsästys- ja kalastustarinoita Suomesta', 'author': 'Kulju, Mika, kirjoittaja.', 'bibid': '2302591'}]
  res.json({books});
})

app.post('/selected_book', function(req, res) {
  bookId = req.body.bookId;
  //sierra method Here
  console.log("bookId received:", bookId);
  res.json({success: true});
})

app.post('/category_guidance', function(req, res) {
  let categoryId = req.body.chosenCategory;
  console.log("SERVER RECEIVED DESIRED CATEGORY:", categoryId);
  res.json({success: true});
})

app.post('/food_or_toilet_guidance', function(req, res) {
  let msg = req.body.msg;
  console.log("Received the following message", msg);
  res.json({success: true});
})

app.get('/guidance', function(req, res) {
  var arrow;
  function read(file, callback) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        console.log(err);
      }
      callback(data);
    });
  }
  var direction = read(path.resolve(__dirname, './direction.txt'), function(data) {
    console.log("direction data is",data);
    data = data.trim()
    res.json({data});
  });
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
