/*
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
*/

var fs = require('fs');

if(process.argv.length && process.argv[0] == 'node') {
	process.argv = process.argv.splice(1);
}

if(process.argv.length != 5) {
    console.log('usage:');
    console.log('\twrapit header input-filename footer output-filename');
	console.log('received ' + process.argv.length + ' arguments');
	console.log(process.argv);
    return;
}

var header = process.argv[1];
var input  = process.argv[2];
var footer = process.argv[3];
var output = process.argv[4];

console.log('header: ' + header);
console.log('input:  ' +  input);
console.log('footer: ' + footer);
console.log('output: ' + output);

var file = fs.readFileSync(input);
var document = header + '\r\n' + file + '\r\n' + footer;
fs.writeFileSync(output, document);

console.log('complete');