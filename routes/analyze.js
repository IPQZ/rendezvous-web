var express = require('express');
var router = express.Router();
var engine = require('../engine/engine')

router.get('/', function(req, res, next) {

  var interests = req.query['interests'];
  var location = req.query['location'];

  req.getConnection(function (err, connection) {
    connection.query('SELECT * FROM hobbies', function (err, results) {
      if (err) return next(err);
      var data = engine.matchHobbies(interests, location);
      res.json(data);
    });
  });

});

module.exports = router;
