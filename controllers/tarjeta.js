'user strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var Tarjeta = require('../models/tarjeta');
var TipoCuenta = require('../models/tipo_cuenta');
var jwt = require('../services/jwt');


const saltRounds = 10;

const saveTarjeta = async(req,res) => {
	var tarjeta = new Tarjeta();
	var params = req.body;	
	
	tarjeta.numero_cuenta = params.numero_cuenta;
	tarjeta.usuario = params.usuario;
	tarjeta.tipo_cuenta = params.tipo_cuenta;
	tarjeta.saldo = params.saldo;

	
	const existeTarjetaYusuario = await Tarjeta.findOne({numero_cuenta:  tarjeta.numero_cuenta});
	
	if(existeTarjetaYusuario){
		res.status(400).send({message: 'La tarjeta y el usuario ya estan asignados'} );
	}else{
		
		// Encriptar contraseña y guardar datos	
		
				if(tarjeta.numero_cuenta != null 
					&&  tarjeta.usuario != null 
					&&  tarjeta.tipo_cuenta != null 
					&&  tarjeta.saldo != null ){						// Guardar el usuario
						
							tarjeta.save((err, tarjetaStored) =>{
							if(err){
								res.status(500).send({message: 'Error al guardar la tarjeta'});
							}else{
								if(!tarjetaStored){
									res.status(404).send({message: 'No se ha registrado la tarjeta'});
						
								}else{
									res.status(200).send({tarjeta: tarjetaStored});
						
								}
				
							}
							});
						
						
				}else{
					res.status(200).send({message: 'Rellena los campos requeridos'});
				}
	}
		
}


function getTarjeta(req,res) {
	  var tarjetaId =req.params.id; 	
    Tarjeta.findById(tarjetaId).populate({path:'tipo_cuenta', select: 'tipo_cuenta'}).populate({path:'usuario', select: 'nombre'}).exec((err,tarjeta)=>{
        if (err) {
	        res.status(500).send({message:'Error en la peticion'});           
        } else {
            if (!tarjeta) {
	            res.status(404).send({message:'La tarjeta no existe'});               
            } else {
	            res.status(200).send({tarjeta});                
            }
        }
    });  
}

module.exports = {
	saveTarjeta,
	getTarjeta
}