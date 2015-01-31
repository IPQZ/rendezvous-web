var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  req.getConnection(function (err, connection) {
    connection.query('SELECT * FROM hobbies', function (err, results) {
      if (err) return next(err);
      res.json(results);
    });
  });

});

module.exports = router;
