#!/usr/bin/env node
var program = require('commander');

var meta = require('./package.json');
var init = require('./actions/init.js');
var compile = require('./actions/compile.js');

program.version(meta.version);

program
	.command('init')
	.description('generate a .bfconfig file')
	.action(init);

program
	.command('watch')
	.description('generate a .bfconfig file')
	.action(init);

program
	.command('compile')
	.description('compile a brainfuck file to javascript')
	.action(compile);

program.parse(process.argv);

