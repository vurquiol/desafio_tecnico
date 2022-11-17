'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioDestinoSchema = Schema({
	nombre:{
		type: String,
		require:true
	},

	rut: {
		type: String,
		require:true,
		unique: true	
	},

	telefono: {
		type: String,		
	},

	banco_destino: {
		type: String,
		require:true,
		unique: true
	},
	tipo_cuenta: {
		type: String,
		require:true,
		unique: true
	},
	numero_cuenta: {
		type: String,
		require:true,
		unique: true
	}
	
})

module.exports = mongoose.model('UsuarioDestino', UsuarioDestinoSchema);