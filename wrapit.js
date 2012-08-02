var http = require('http');
var request = require('request');
var fs = require('fs');

var reportError = function(res, err) { 
	res.statusCode = 500;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(err));
};

exports.handleRequest = function(req, res, proxy) { 
	var url = require('url').parse(req.url);
	var query = require('querystring').parse(url.query);
	query.url = query.url || query.u;
	query.footer = query.footer || query.f;
	query.header = query.header || query.h;
	query.type = query.type || query.t;
	if(query.url) { 	
		console.log(query);	
		request(query.url, function(err, remoteRes, body) {	
			if(err) { 
				console.dir(err);
				reportError(res, err);
			} else {
				if(query.type) { res.setHeader('Content-Type', query.type); }
				if(query.header) { res.write(query.header + '\r\n'); }
				res.write(body);
				if(query.footer) { res.write('\r\n' + query.footer); }
				res.end();
			}
		});	
	} else {	
		// show markdown		
		fs.readFile(__dirname + '/README.markdown', 'utf8', function(err, data){
			if(err) { 
				reportError(res, err);
			} else {
				res.setHeader('Content-Type', 'text/html');
				var html = require("node-markdown").Markdown(data.toString());
				res.write(html);
				res.end();
			}
		});
	}
};


