var readline = require('readline');

var rl = readline.createInterface({
	input:process.stdin,
	output:process.stout
});

exports.onReadable = function (callback) {
		rl.on('line', function(answer){
			var linha = (answer) ? answer.toString() : '';
			linha = linha.replace(/\n/, '');
			if (linha) callback(linha);
		
	});
};

