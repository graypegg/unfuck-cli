var chalk = require('chalk');
var ui = require('clui');

class ErrorSet {
	constructor () {
		this.errors = [];
		this.lineBuffer = new ui.LineBuffer({
			x: 0,
			y: 0,
			width: 'console',
			height: 'console'
		});

		this.header = new ui.Line(this.lineBuffer)
		  .column('Errors Found.', 13, [chalk.bgRed.white])
		  .fill()
		  .store();

		this.lineBuffer.output();
	}

	warn ( title, desc, err ) {
		var out = '';
		out += chalk.bgYellow.black(' Warning ') + ' - ';
		out += chalk.yellow(title) + '\n';
		out += chalk.white(desc);

		if (err) {
			out += '\n---\n';
			out += err
		}

		this.errors.push({
			type: 'warning',
			out
		})

	}

	throw () {
		var errorTypes = [
			this.errors.filter((error) => error.type === 'warning'),
			this.errors.filter((error) => error.type === 'failure')
		]

		errorTypes.forEach((errors, key) => {
			errors.forEach((error, key) => {
				console.warn(
					chalk.bgWhite.black(' ' + (key + 1) + '. ') + error.out
				)

				if (key+1 !== errors.length) console.log( );
			})

			if (key+1 !== errorTypes.length) console.log( chalk.black('\n-\n') );
		})

		process.exit(1);
	}
}

module.exports = ErrorSet;
