const async = require('async'),
       monk = require('monk'),
       Hero = require('./hero');

const default_heroes = ["Mr. Nice", "Narco", "Bombasto", "Celeritas", "Magneta", "RubberMan", "Dynama", "Dr IQ", "Magma", "Tornado"];
const mongodb = monk('mongodb://localhost:27017/tour-of-heroes');

function toHeroInstance(doc) {
  if (doc == null) return null;
  return new Hero(doc.id, doc.name);
}

function toHeroInstances(docs) {
  if (docs == null) return null;
  return docs.map(toHeroInstance);
}

function mapping(callback) {
  return function(err, result) {
    if (err) {
      callback(err);
    } else if (Array.isArray(result)) {
      callback(null, toHeroInstances(result));
    } else {
      callback(null, toHeroInstance(result));
    }
  }
}

function Database() {
  this.ids = mongodb.get('ids');
  this.heroes = mongodb.get('hero');
  this.init();
}

Database.prototype.init = function() {
  var self = this;
  async.parallel([
      function(next) {self.ids.index({name: 1}, {unique: true}, next);},
      function(next) {self.heroes.index({id: 1}, {unique: true}, next);},
      function(next) {self.heroes.index({name: "text"}, next);},
      function(next) {self.heroes.count({}, function(err, count) {
        if (err) return next(err);
        if (count > 0) return; // already initialized
        for (var i = 0; i < default_heroes.length; i++) {
          self.addHero(default_heroes[i]);
        }
      })}
    ],
      function(err) {
        if (err) {
          console.error("Error initializing database:", err);
          process.exit(1);
        }
      });
};

Database.prototype.genNewId = function(callback) {
  this.ids.findOneAndUpdate(
      { name: 'hero_id' },
      {
        $inc: { val: 1 }
      },
      {
        upsert: true,
        returnOriginal: false
      },
      function(err, doc) {
        callback(err, doc ? doc.val : null);
      }
  );
};

Database.prototype.addHero = function(name, callback) {
  var self = this;
  self.genNewId(function(err, id) {
    if (err) return callback(err);
    self.heroes.insert(new Hero(id, name), mapping(callback));
  });
};

Database.prototype.getHero = function(id, callback) {
  this.heroes.findOne({id: parseInt(id)}, mapping(callback));
};

Database.prototype.getHeroes = function(callback) {
  this.heroes.find({}, {sort: { id: 1 }}, mapping(callback));
};

Database.prototype.updateHero = function(id, name, callback) {
  this.heroes.findOneAndUpdate({id: parseInt(id)}, {$set: {name: name}}, mapping(callback));
};

Database.prototype.deleteHero = function (id, callback) {
  this.heroes.findOneAndDelete({id: parseInt(id)}, mapping(callback));
};

Database.prototype.searchHeroes = function(name, callback) {
  this.heroes.find({$text: {$search: name}}, {sort: { id: 1 }}, mapping(callback));
};

module.exports = new Database();
