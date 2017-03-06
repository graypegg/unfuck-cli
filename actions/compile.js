var uf = require('unfuck');
var fsp = require('fs-promise');
var path = require('path');

var defaultOptions = require('../default.json');

module.exports = function () {
	var bfconfig = path.join(process.cwd(), '.bfconflig');
	fsp.readFile(bfconfig, 'utf8')
		.catch(function(err){ return JSON.parse(defaultOptions); })
		.then(function(opt){ return JSON.parse(opt); })
		.then(function(opt) {
			console.log(opt)
		})
}