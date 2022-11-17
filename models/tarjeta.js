'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TarjetaSchema = Schema({
	numero_cuenta:{
		type: String,
		require:true
	},
	usuario: {
		type:Schema.ObjectId,
		ref: 'Usuario'			
	},
	tipo_cuenta: { 
		type:Schema.ObjectId,
		ref: 'TipoCuenta'
	},
	saldo: {
		type: Number,
		require:true
	}
})


module.exports = mongoose.model('Tarjeta', TarjetaSchema);