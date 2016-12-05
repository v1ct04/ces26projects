// Requires
const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const Database   = require('./database');

const port = process.env.PORT || 23726; // CES26

var app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const heroesApi = express.Router();

function resultTo(res) {
  return function(err, result) {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({err: err.toString()});
    } else {
      res.json({data: result});
    }
  }
}

heroesApi.get('/', function (req, res) {
  if (req.query.name) {
    Database.searchHeroes(req.query.name, resultTo(res));
  } else {
    Database.getHeroes(resultTo(res));
  }
});

heroesApi.post('/', function (req, res) {
  Database.addHero(req.body.name, resultTo(res));
});

heroesApi.get('/:heroId', function (req, res) {
  Database.getHero(req.params.heroId, resultTo(res));
});

heroesApi.put('/:heroId', function (req, res) {
  Database.updateHero(req.params.heroId, req.body.name, resultTo(res));
});

heroesApi.delete('/:heroId', function (req, res) {
  Database.deleteHero(req.params.heroId, resultTo(res));
});

app.use('/app/heroes', heroesApi);

var server = app.listen(port, function() {
  console.log('Listening on port ' + server.address().port + '.');
});
