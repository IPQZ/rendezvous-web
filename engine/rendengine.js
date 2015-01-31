/**
	Matches a hobbies
*/

var mysql = require('mysql');
var http = require('http');
var yelp = require('yelp').createClient({
    consumer_key: 'MnDyNxnoLBYEL2DoyrB05g',
    consumer_secret: 'oEyzbrtkF_Bvi_DJ6RSHEsa_7ak',
    token: 'Vt-uYZvA9mOnvIXkBV8Cu44MzOnnNuau',
    token_secret: 'pQt6Oisw2Jc3uo_wFb8pE1BGISY'
})


function matchInterests(i1, i2) {
    matched = []
    for (var i = 0; i < i1.length; i++) {
        var current = i1[i]
        if (i2.indexOf(current) >= 0)
            matched.append(current)
    }
    return matched
}

function matchHobbies(l, location) {
    eventList = yelp.search({
        term: l,
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
                address: current.location.display_address,
                isclosed: current.is_closed,
            })
        }
        info = JSON.stringify(info);
        console.log(info)
        return info
    })
}

matchHobbies('food', 'Toronto ')
