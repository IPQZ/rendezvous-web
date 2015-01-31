var express = require('express');
var router = express.Router();
var engine = require('../engine/engine')

router.get('/', function(req, res, next) {

  var interests = JSON.parse(req.query['interests']);

  interests = interests.filter(function(elem, pos) {
    return interests.indexOf(elem) == pos;
  });

  var interestsStr = interests.join(',');

  var query = "SELECT t.hobby_name, SUM(t.value) AS value FROM (SELECT interests.name AS interest_name, hobbies.name AS hobby_name, graph.value FROM graph INNER JOIN hobbies ON hobbies.id = graph.hobby_id INNER JOIN interests ON interests.id = graph.interest_id WHERE graph.interest_id IN ($SELECTED_INTERESTS$)) AS t GROUP BY t.hobby_name ORDER BY value DESC";
  query = query.replace("$SELECTED_INTERESTS$", interestsStr)

  req.getConnection(function (err, connection) {
    connection.query(query, function (err, results) {
      if (err) return next(err);
      res.json(results);
    });
  });

});

module.exports = router;
