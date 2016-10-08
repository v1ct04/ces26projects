// Requires
var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');

var fs = require('fs');
var readline = require('readline');

const port = process.env.PORT || 23726; // CES26
const k_dataFile = 'storage.data';

var app        = express();
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

function isPalindrome(word) {
  word = word.trim().toLowerCase();
  for (let i = 0, j = word.length - 1; i < j; i++, j--) {
    while (/\s/.test(word[i])) i++;
    while (/\s/.test(word[j])) j--;
    if (word[i] != word[j]) return false;
  }
  return true;
}
app.locals.isPalindrome = isPalindrome;

app.get('/', function(req, res) {
  readFileLines(k_dataFile, function(words) {
    res.render('index', {words: words});
  });
});

app.post('/word', function(req, res) {
  word = req.body.word.trim();
  if (word == "" || !isPalindrome(word)) {
    res.status(400).json({error: "Bad Request: A palavra tem que ser um palíndrome!"});
    return;
  }
  readFileLines(k_dataFile, function(words) {
    if (words.indexOf(word) >= 0) {
      res.status(400).json({error: "Palíndrome já está inserido!"});
      return;
    }
    fs.appendFile(k_dataFile, word + '\n', function() {
      words.push(word);
      res.json({words: words});
    });
  });
});

var server = app.listen(port, function() {
  console.log('Listening on port ' + server.address().port + '.');
});
