/**
	Matches a hobbies
*/

var mysql = require('mysql');
var http = require('http');

tools = {};

tools.matchInterests = function(i1, i2) {
    matched = []
    for (var i = 0; i < i1.length; i++) {
        var current = i1[i]
        if (i2.indexOf(current) >= 0)
            matched.append(current)
    }
    return matched
}

module.exports = tools;
