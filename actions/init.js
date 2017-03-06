var fs = require('fs');
var inquirer = require('inquirer');

var questions = [
	{
		type: 'list',
		name: 'arrayType',
		message: 'Default array datatype?',
		choices: [
			'Array',
			'Int8Array',
			'Uint8Array',
			'Uint8ClampedArray',
			'Int16Array',
			'Uint16Array',
			'Int32Array',
			'Uint32Array'
		]
	},
	{
		type: 'input',
		name: 'tapeWidth',
		message: 'Default array (tape) width?',
		validate: (val) => !isNaN(val) || "Width MUST be a integer",
		filter: (val) => parseInt(val),
		when: (ans) => ans.arrayType != 'Array'
	},
	{
		type: 'list',
		name: 'inputType',
		message: 'Default input datatype?',
		choices: [
			'String',
			'Number'
		]
	},
	{
		type: 'list',
		name: 'outputType',
		message: 'Default output datatype?',
		choices: [
			'String',
			'Number'
		]
	},
	{
		type: 'list',
		name: 'compilerMode',
		message: 'Compiler mode?',
		choices: [
			{ name: 'Node.js/commonJS module', value: 'node'},
			{ name: 'ES6 module', value: 'es6'},
			{ name: 'Raw function', value: 'raw'}
		]
	},
	{
		type: 'input',
		name: 'targetDirectory',
		message: 'Where should compiled files go?',
		validate: (val) => (val.slice(0,2) === './' && val.length > 2) || 'Must be a relative path begining with \'./\''
	}

];

module.exports = () => {
	inquirer.prompt(questions).then(function (ans) {
		var json = JSON.stringify(ans, null, '\t');

		fs.writeFile('.bfconfig', json, { flag: 'wx' }, function (err) {
			if (err) {
				if (err.code === 'EEXIST') {
					inquirer.prompt({
						type: 'confirm',
						name: 'overwrite',
						message: 'Overwrite current .bfconfig?'
					}).then(function (ans) {
						if (ans.overwrite) {
							fs.writeFile('.bfconfig', json, { flag: 'w' }, function (err) {
								if (err) throw err;
								console.log('Saved.');
							});
						}
					})
				} else {
					throw err;
				}
			} else {
				console.log('Saved.');
			}
		});
	});
}