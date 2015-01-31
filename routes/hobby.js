var express = require('express');
var router = express.Router();

var yelp = require('yelp').createClient({
  consumer_key: 'MnDyNxnoLBYEL2DoyrB05g',
  consumer_secret: 'oEyzbrtkF_Bvi_DJ6RSHEsa_7ak',
  token: 'Vt-uYZvA9mOnvIXkBV8Cu44MzOnnNuau',
  token_secret: 'pQt6Oisw2Jc3uo_wFb8pE1BGISY'
})

router.get('/', function(req, res, next) {

  var term = req.query['term'];
  var location = req.query['location'];

  eventList = yelp.search({
    term: term,
    location: location
  }, function(error, data) {
    console.log(error);
    var info = JSON.parse('{"events":[]}')
    for (var i in data.businesses) {
      current = data.businesses[i]
      info.events.push({
        name: current.name,
        rating: current.rating,
        image: current.image_url,
        address: current.location.display_address.join(", "),
        isclosed: current.is_closed,
      })
    }
    console.log(JSON.stringify(info))
    res.json(info);
  })

});

module.exports = router;
