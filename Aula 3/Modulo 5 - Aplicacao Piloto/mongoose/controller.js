//Criar, Recuperar, Atualizar e Deletar (CRUD)
var mongo = require('./model')()

module.exports = function () {
	controller = {};

	// Buscando todos os dispositivos
	controller.listatodos = function(req, res) {
		mongo.find(function(err, devices) {
  			if (err) return err;
  			res.send(devices);
		});
	};

	// Buscando um unico dispositivo por nome
	controller.buscaDeviceNome = function(device_name) {
		mongo.findOne({ name: device_name }, function(err, name) {
  		if (err) return err;
  			return name;
		});
	};
	

	// Buscando todos dispositivos por ID.
	controller.buscaDeviceID = function(ID) {
		mongo.find({ id_device: ID }, function(err, devices) {
  			if (err) return err;
  			return devices;
		});
	};

	// salva dispositivos
	controller.save = function(id, nome, valor){
		var device = new mongo({
  			id_device: id,
  			name: nome,
  			value: valor
		});

		device.save(function(err, element) {
  			if (err) return err;
  			return element;
		});
	}

	// remove device
	controller.removedevice = function(_id){
        console.log(_id);
 
        mongo.remove({"_id" : _id}, function(err, element) {
            if (err) return err;
  			return "deletou id: " + _id;
    	});
    }
  
  //atualiza device
  controller.updatedevice = function(_id, objeto){
       if(_id) {
            mongo.findByIdAndUpdate(_id, objeto, function(err, element) {
            	 if (err) return err;
  					return "Atualizou objeto: " + element + " para " + objeto;
            });
           
     	}
    };
  


	return controller;
}