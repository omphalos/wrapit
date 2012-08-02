Webservice to wrap any web resource in a header and footer.  Good for wrapping javascript files in require calls.

Example: use uglify-js in the browser
=====================================

This package exposes a directory to create, read, update, delete operations.

Command-line usage
==================

     wrapit [options]

This starts a wrapit web service using the specified command-line options.

	-p: port to listen on (example, 85)
	-q: suppress the help message

Web service usage
=================

http://wrapit.jit.su/?url=http://codemirror.net/lib/codemirror.js&header=provide('CodeMirror',function(require,exports,module){&footer=exports.CodeMirror=CodeMirror;})&type=text/javascript

There are four parts to this, ?url &header &footer &type.  Let's break that up:
	
	http://wrapit.jit.su/
	**?url=**http://codemirror.net/lib/codemirror.js
	**&header=**provide('CodeMirror',function(require,exports,module){
	**&footer=**exports.CodeMirror=CodeMirror;})
	**&type=**text/javascript	
	
	In this case, the url is http://codemirror.net/lib/codemirror.js, which gets wrapped in a 'provide' definition (taken from require-shim).  Type signifies the mime type (which you can leave blank in most cases).
	
	Of course, you can use whatever require library you want.  Also, you don't have to just wrap javascript files -- you can wrap css or html or anything else for that matter.  **wrapit** doesn't care.

Server-side usage
=================

	require('http').createServer(function (req, res) {
		require('wrapit').handleRequest(req, res);
	}).listen(port);	

Run the Example
===============

There is an example.html file in the local directory, demonstrating how to run uglify-js in a web page without installing anything (even Node.js) on your local machine.

Why might this be useful?
=========================

This utility is designed to help a web developer quickly prototype namespaced javascript code, but there are probably other uses as well.

    


