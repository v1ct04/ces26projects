// Requires
var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var fs = require('fs');
var readline = require('readline');

const port = process.env.PORT || 23726; // CES26
const k_dataFile = 'storage.data';

var app        = express();
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

function readFileLines(filename, callback) {
  var lines = [];
  readline.createInterface({input: fs.createReadStream(filename)})
      .on('line', function(line) {
        lines.push(line);
      })
      .on('close', function() {
        callback(lines);
      });
}

app.get('/', function(req, res) {
  readFileLines(k_dataFile, function(names) {
    res.render('index', {name: req.cookies.name, names: names});
  });
});

app.post('/name', function(req, res, next) {
  name = req.body.name.trim();
  if (name == "") {
    res.status(400).send("Please insert your name before sending");
  } else {
    fs.appendFile(k_dataFile, name + '\n', {}, function() {
      res.cookie('name', name);
      res.redirect('/');
    });
  }
});

var server = app.listen(port, function() {
  console.log('Listening on port ' + server.address().port + '.');
});
