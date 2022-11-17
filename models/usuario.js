'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	nombre:{
		type: String,
		require:true
	},
	apellido: {
		type: String,
		require:true		
	},

	email: {
		type: String,
		require:true,
		unique: true
	},
	clave: {
		type: String,
		require:true,
		unique: true
	},
	rol: {
		type: String,
		require:true,
		default:'USER_ROLE'
	}
	
	
	
})

module.exports = mongoose.model('Usuario', UsuarioSchema);