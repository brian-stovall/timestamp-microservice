var express = require('express');
var path = require('path');

var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/:data', (request, response) => {
	//try to make try to make unix date from number
	date = new Date( parseInt(request.params.data * 1000));

	//if it isn't good
	if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN( date.getTime() ) ) {

		//try to make natural date from string
		var date = new Date(request.params.data);

		//if it still doesn't work, return null
		if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN( date.getTime() ) ) 
			response.send({'natural': null,
										 'unix'   : null});
	}

	//process our data and return
	var dateString = (!isNaN(date.getTime())) ? 
		date.toLocaleString('en-US', {month:'long', day:'numeric', year:'numeric'}) :
		null;
	response.send({'natural': dateString, 
								 'unix'   : parseInt(date.getTime() / 1000)});
});

app.use( (request, response) => {
		response.sendFile(__dirname + '/public/index.html');
});


app.listen('8080');
console.log('timestamp service listening on port 8080');

