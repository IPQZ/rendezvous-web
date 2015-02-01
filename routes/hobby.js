var express = require('express');
var router = express.Router();

var yelp = require('yelp').createClient({
	consumer_key: process.env.YELP_KEY,
	consumer_secret: process.env.YELP_SECRET,
	token: process.env.YELP_TOKEN,
	token_secret: process.env.YELP_TOKEN_SECRET
});

router.get('/', function(req, res, next) {

	var term = req.query['term'];
	var location = JSON.parse(req.query['location']);

	eventList = yelp.search({
		term: term,
		ll: location[0] + "," + location[1]
	}, function(error, data) {
		console.log(error);
		var info = {}
		for (var i in data.businesses) {
			current = data.businesses[i]
			info.push({
				name: current.name,
				rating: current.rating,
				image: current.image_url,
				address: current.location.display_address.join(", "),
				isclosed: current.is_closed
			})
		}
		console.log(JSON.stringify(info))
		res.json(info);
	})

});

module.exports = router;
