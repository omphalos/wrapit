var http = require('http');
var request = require('request');
var fs = require('fs');

var reportError = function(res, err) { 
	console.dir(err);
	try {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(err));
	} catch(err2) { 
		console.log(err2);
	}
};

exports.handleRequest = function(req, res, proxy) { 
	var url = require('url').parse(req.url);	
	var query = require('querystring').parse(url.query);
	query.url = query.url || query.u; // pass ?url= or ?u=
	query.footer = query.footer || query.f; // pass &footer= or &f=
	query.header = query.header || query.h; // pass &header= or &h=
	query.type = query.type || query.t;	// pass &type= or &t=
	if(query.url) { 
		// if ?url is supplied, wrap a url
		console.log(query);	
		request(query.url, function(err, remoteRes, body) {	
			if(err) { 
				reportError(res, err);
			} else {
				// &type= sets the mime type, e.g., &type=text/javascript
				if(query.type) { res.setHeader('Content-Type', query.type); }
				
				// &header= sets the header, e.g., &header=provide('uglify-js', function(require, exports,module) {
				if(query.header) { res.write(query.header + '\r\n'); }
				
				// write the body (which we got from url)
				res.write(body); 
				
				// &footer= sets the footer, e.g., &footer=});
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


