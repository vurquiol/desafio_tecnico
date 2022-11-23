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
	rut_origen: {
		type: String
		
	},
	correo: {
		type: String,		
	},
	telefono: {
		type: String,		
	},

	banco_destino: {
		type: String,
		require:true
	},
	tipo_cuenta: {
		type: String,
		require:true
	},
	numero_cuenta: {
		type: String,
		require:true,
		unique: true
	}
	
})

module.exports = mongoose.model('UsuarioDestino', UsuarioDestinoSchema);