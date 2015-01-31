/**
	Matches a hobbies
*/

var mysql = require('mysql');

function matchInterests(i1, i2) {
	matched = []
	for (var i = 0; i < i1.length; i++) {
		var current = i1[i]
		if (i2.indexOf(current) >= 0)
			matched.append(current)
	}
	return matched
}

function matchHobbies(l) {
	matched = []
	hobbyJson = mysql.query yolo

}
