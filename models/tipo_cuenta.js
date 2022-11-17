'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoCuentaSchema = Schema({
	tipo_cuenta:{
		type: String,
		require:true
	}

})


module.exports = mongoose.model('TipoCuenta', TipoCuentaSchema);