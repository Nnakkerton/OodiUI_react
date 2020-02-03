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

books = 0;

app.post('/searchterm', function(req, res) {
  let searchTerm = req.body.search;
  console.log("SERVER RECEIVED SEARCHTERM:", searchTerm);

  console.log("are we dead yet?");

  var options = {
      mode: 'json',
      pythonPath: '/usr/bin/python',
      pythonOptions: ['-u'],
      // make sure you use an absolute path for scriptPath
      scriptPath: '/home/pi/OodiUI_react/server/sierra/',
      args: [searchTerm, 'value2', 'value3']
    };

    console.log(options);

    PythonShell.run('sierra_script.py', options, function (err, results) {
      if (err) throw err;
      books = results[0];
      console.log("books has been set as results", books);
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
      res.json({success: true});
    });
  console.log("books are", books);

  //res.json({success: true});
})

var bookId;

app.get('/get_books', function(req, res) {
  console.log("getbooks debug print: ", books);
  res.json({books});
})

app.post('/selected_book', function(req, res) {
  bookId = req.body.bookId;
  console.log("bookId received:", bookId);

  // calling mission_script.py

  var options = {
      mode: 'json',
      pythonPath: '/usr/bin/python',
      pythonOptions: ['-u'],
      // make sure you use an absolute path for scriptPath
      scriptPath: '/home/pi/OodiUI_react/server/sierra/',
      args: [bookId, 'book', 'value3']
    };

    PythonShell.run('mission_script.py', options, function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
      res.json({success: true});
    });

//res.json({success: true});
})

app.post('/category_guidance', function(req, res) {
  let categoryId = req.body.chosenCategory;
  console.log("SERVER RECEIVED DESIRED CATEGORY:", categoryId);

  // calling mission_script.py

  var options = {
      mode: 'json',
      pythonPath: '/usr/bin/python',
      pythonOptions: ['-u'],
      // make sure you use an absolute path for scriptPath
      scriptPath: '/home/pi/OodiUI_react/server/sierra/',
      args: [categoryId, 'category', 'value3']
    };

    PythonShell.run('mission_script.py', options, function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
      res.json({success: true});
    });

//res.json({success: true});
})

app.post('/food_or_toilet_guidance', function(req, res) {
  let msg = req.body.msg;
  console.log("Received the following message", msg);

  // calling mission_script.py

  var options = {
      mode: 'json',
      pythonPath: '/usr/bin/python',
      pythonOptions: ['-u'],
      // make sure you use an absolute path for scriptPath
      scriptPath: '/home/pi/OodiUI_react/server/sierra/',
      args: [msg, 'location', 'value3']
    };

    PythonShell.run('mission_script.py', options, function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
      res.json({success: true});
    });

//res.json({success: true});
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
//  var direction = read(path.resolve(__dirname, './direction.txt'), function(data) {
  var direction = read(path.resolve('/home/pi/OodiUI_react/server/direction.txt'), function(data) {
    console.log("direction data is",data);
    data = data.trim()
    res.json({data});
  });
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
