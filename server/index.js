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
  let searchTerm = req.body.searchTerm;
  console.log("SERVER RECEIVED SEARCHTERM:", searchTerm);
  res.json({success: true});
})

var bookId;

app.get('/get_books', function(req, res) {
  let books;
  books = { 1469241: {'title': 'Frantsilan yrttitilan kasviskeittokirja', 'author': 'Raipala-Cormier, Virpi'},
        2251846: {'title': 'Uusimaa kuvissa : tarinoita ja tunnelmia Karkkilasta, Loviisasta, Porvoosta ja Vihdistä', 'author': 'Joku tyyppi'},
        1469241: {'title': 'Frantsilan yrttitilan kasviskeittokirja', 'author': 'Raipala-Cormier, Virpi'},
        2251840: {'title': 'Uusimaa kuvissa : tarinoita ja tunnelmia Karkkilasta, Loviisasta, Porvoosta ja Vihdistä', 'author': 'Joku tyyppi'},
        1469242: {'title': 'Frantsilan yrttitilan kasviskeittokirja', 'author': 'Raipala-Cormier, Virpi'},
        2251844: {'title': 'Uusimaa kuvissa : tarinoita ja tunnelmia Karkkilasta, Loviisasta, Porvoosta ja Vihhdistä', 'author': 'Joku tyyppi'},
        1469241: {'title': 'Frantsilan yrttitilan kasviskeittokirja', 'author': 'Raipala-Cormier, Virpi'},
        2251846: {'title': 'Uusimaan kuvissa : tarinoita ja tunnelmia Karkkilasta, Loviisasta, Porvoosta ja Vihdistä', 'author': 'Joku tyyppi'},
        1469241: {'title': 'Frantsilan yrttitilan kasviskeittokirja', 'author': 'Raipala-Cormier, Virpi'},
        2251846: {'title': 'Uusimaat kuvissa : tarinoita ja tunnelmia Karkkilasta, Loviisasta, Porvoosta ja Vihdistä', 'author': 'Joku tyyppi'}};
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
