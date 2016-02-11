var express = require('express');
var path = require('path');

var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/:data', (request, response) => {
	//try to make try to make unix date from number
	console.log('the number is ' + parseInt(request.params.data));
	date = new Date( parseInt(request.params.data) );

	//if it isn't good
	if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN( date.getTime() ) ) {

		//try to make natural date from string
		var date = new Date(request.params.data);

		//if it still doesn't work, return intro page
		if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN( date.getTime() ) ) 
			response.sendFile(__dirname + '/public/index.html');
	}

	//we have a good date, so process it
	var dateString = date.toLocaleString('en-US', {month:'long', day:'numeric', year:'numeric'});
	response.send({'natural': dateString,
								                'unix'   : date.getTime()});
});

app.use( (request, response) => {
		response.sendFile(__dirname + '/public/index.html');
});


app.listen('8080');
console.log('timestamp service listening on port 8080');

