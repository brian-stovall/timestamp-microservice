var express = require('express');
var path = require('path');

var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/:data', (request, response) => {
	//set up response header
	response.setHeader('Content-Type', 'application/json');

	//try to make try to make unix date from number
	date = new Date( parseInt(request.params.data * 1000));

	//if date isn't valid
	if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN( date.getTime() ) ) {

		//try to make natural date from string
		var date = new Date(request.params.data);
	}

	//if it still isn't valid, return null
	if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN( date.getTime() ) ) {
			response.write(JSON.stringify({'unix': null,
										 'natural'   : null}),
				             (err) => { response.send();});
		

	//otherwise, process our data and return
	} else {

	var dateString = (!isNaN(date.getTime())) ? 
		date.toLocaleString('en-US', {month:'long', day:'numeric', year:'numeric'}) :
		null;
	response.write(JSON.stringify({'unix'   : parseInt(date.getTime() / 1000),
																 'natural': dateString}),
								 (err) => {response.send();});
	}
});

app.use( (request, response) => {
		response.sendFile(__dirname + '/public/index.html');
});


app.listen(process.env.PORT || '8080');
console.log('timestamp service listening on port 8080');

