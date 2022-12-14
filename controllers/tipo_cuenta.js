'user strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var TipoCuenta = require('../models/tipo_cuenta');
var jwt = require('../services/jwt');


const saltRounds = 10;

const saveTipoCuenta = async(req,res) => {
	var tipoCuenta = new TipoCuenta();
	var params = req.body;	
	
	tipoCuenta.tipo_cuenta = params.tipo_cuenta;
	
	const existeTipoCuenta = await TipoCuenta.findOne({tipo_cuenta:  tipoCuenta.tipo_cuenta});
	
	if(existeTipoCuenta){
		res.status(400).send({message: 'El tipo de cuenta ya esta registrado'} );
	}else{
		
		// Encriptar contraseña y guardar datos			
				if(tipoCuenta.tipo_cuenta != null){
						// Guardar el usuario
						
							tipoCuenta.save((err, tipoCuentaStored) =>{
							if(err){
								res.status(500).send({message: 'Error al guardar el tipo de cuenta'});
							}else{
								if(!tipoCuentaStored){
									res.status(404).send({message: 'No se ha registrado el tipo de cuenta'});
						
								}else{
									res.status(200).send({tipoCuenta: tipoCuentaStored});
						
								}
				
							}
							});
						
						
				}else{
					res.status(200).send({message: 'Rellena los campos requeridos'});
				}
	}
		
}

function getTipoCuenta(req,res) {
	var tipoCuentaId = req.params.id;

	TipoCuenta.findById(tipoCuentaId, (err, tipocuenta) => {
		if(err){
			res.status(500).send({message: 'Error al buscar el tipo de cuenta'});
		}else{
			if(!tipocuenta){
				res.status(404).send({message: 'No existe el tipo de cuenta'});
			
			}else{
				res.status(200).send({tipocuenta});
			}
		}
	});
}

function getCuentas(req,res) {

    console.log('tipocuenta')
	TipoCuenta.find((err, tipocuenta) => {
		if(err){
			res.status(500).send({message: 'Error al buscar el tipo de cuenta'});
		}else{
			if(!tipocuenta){
				res.status(404).send({message: 'No existe el tipo de cuenta'});
			
			}else{
				console.log(tipocuenta)
				res.status(200).send({tipocuenta});
			}
		}
	});
}


module.exports = {
	saveTipoCuenta,
	getTipoCuenta,
	getCuentas
}