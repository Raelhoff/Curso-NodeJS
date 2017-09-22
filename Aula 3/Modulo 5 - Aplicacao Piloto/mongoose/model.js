var mongoose = require('mongoose');
//Esquemas e Modelo
module.exports = function(){
	var deviceSchema = new mongoose.Schema({
  		id_device: Number,
  		name: String,
  		value: Number
	});

	return mongoose.model('Device', deviceSchema);
}
