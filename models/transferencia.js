   'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transferenciaSchema = Schema({
	nombre:{
		type: String,
		require:true
	},
	rut_origen:{

		type: String	
	},
	rut: {
		type: String,	
	},
	correo: {
		type: String,
		require:true
		
	},
	banco_destino: {
		type: String,
		require:true
	},
	tipo_cuenta: {
		type: String,
		require:true
	},
	
	monto:{
		type: Number
	},
	fecha:{
		type: Date
	}

	
	
	
})

module.exports = mongoose.model('Transferencia', transferenciaSchema);

 