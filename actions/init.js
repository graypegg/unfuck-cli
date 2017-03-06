var fs = require('fs');
var inquirer = require('inquirer');

var questions = [
	{
		type: 'list',
		name: 'compiler.type',
		message: 'Default array datatype?',
		default: 'Uint8Array',
		choices: [
			'Uint8Array',
			'Int8Array',
			'Uint16Array',
			'Int16Array',
			'Uint32Array',
			'Int32Array',
			'Array'
		]
	},
	{
		type: 'input',
		name: 'compiler.tapeWidth',
		message: 'Default array (tape) width?',
		default: 30000,
		validate: (val) => !isNaN(val) || "Width MUST be a integer",
		filter: (val) => parseInt(val),
		when: (ans) => ans.arrayType != 'Array'
	},
	{
		type: 'list',
		name: 'compiler.in',
		message: 'Default input datatype?',
		default: 'String',
		choices: [
			'String',
			'Number'
		]
	},
	{
		type: 'list',
		name: 'compiler.out',
		message: 'Default output datatype?',
		default: 'String',
		choices: [
			'String',
			'Number'
		]
	},
	{
		type: 'list',
		name: 'compiler.target',
		message: 'Compiler output target?',
		default: 'simple-es6',
		choices: [
			{ name: 'Synchronous ES6', short: 'simple-es6', value: 'simple-es6'},
			{ name: 'Asynchronous ES6', short: 'interactive-es6', value: 'interactive-es6'}
		]
	},
	{
		type: 'list',
		name: 'moduleType',
		message: 'Compiler mode?',
		default: 'cjs',
		choices: [
			{ name: 'Node.js/commonJS module', short: 'cjs', value: 'cjs'},
			{ name: 'ES6 module', short: 'es6', value: 'es6'},
			{ name: 'Global function', short: 'global', value: 'global'}
		]
	},
	{
		type: 'input',
		name: 'targetDirectory',
		message: 'Where should compiled files go?',
		default: './',
		validate: (val) => fs.existsSync(val) || 'You must supply a valid directory path.'
	}

];

module.exports = () => {
	inquirer.prompt(questions).then(function (ans) {

		// This will be removed when Unfuck has multiple BF languages...
		ans.compiler.language = 'standard';
		// ---

		var json = JSON.stringify(ans, null, '\t');

		fs.writeFile('.bfconfig', json, { flag: 'wx' }, (err) => {
			if (err) {
				if (err.code === 'EEXIST') {
					inquirer.prompt({
						type: 'confirm',
						name: 'overwrite',
						message: 'Overwrite current .bfconfig?'
					}).then((ans) => {
						if (ans.overwrite) {
							fs.writeFile('.bfconfig', json, { flag: 'w' }, (err) => {
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
