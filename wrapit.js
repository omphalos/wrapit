var http = require('http');
var request = require('request');
var fs = require('fs');
var util = require('util');

var reportError = function(res, err) { 
	console.dir(err);
	try {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'application/json');
		var message = util.inspect(err);
		if(message.indexOf("Invalid URI") >= 0) { 
			message += '; Make sure to include http:// in the url'; 
		}
		res.end(message);
	} catch(err2) { 
		console.log(err2);
	}
};

exports.wrapit = function(req, res, query) { 
	request(query.url, function(err, remoteRes, body) {	
		try {
			// console.dir(remoteRes);
			if(err) { 
				reportError(res, err);
			} else {
				// pipe the headers
				res.writeHead(remoteRes.headers);
				res.statusCode = remoteRes.statusCode;
			
				// &header= sets the header, e.g., &header=provide('uglify-js', function(require, exports,module) {
				if(query.header) { res.write(query.header + '\r\n'); }
				
				// write the headers & body (which we got from url)
				res.write(body); 
				
				// &footer= sets the footer, e.g., &footer=});
				if(query.footer) { res.write('\r\n' + query.footer); }
				
				res.end();
			}
		} catch(err) { 
			reportError(res, err);
		}
	});	
};

exports.handleRequest = function(req, res) { 
	var url = require('url').parse(req.url);	
	var query = require('querystring').parse(url.query);
	query.url = query.url || query.u; // pass ?url= or ?u=
	query.footer = query.footer || query.f; // pass &footer= or &f=
	query.header = query.header || query.h; // pass &header= or &h=
	query.type = query.type || query.t;	// pass &type= or &t=
	if(query.url) { 
		// if ?url is supplied, wrap a url
		console.log(query);	
		exports.wrapit(req, res, query);
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


