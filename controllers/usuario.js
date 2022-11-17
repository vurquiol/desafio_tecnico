'user strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var Usuario = require('../models/usuario');
var jwt = require('../services/jwt');


const saltRounds = 10;

const saveUser = async(req,res) => {
	var usuario = new Usuario();

	var params = req.body;
	const {email, clave, nombre} = req.body;

	
	//console.log(params);

	usuario.nombre = params.nombre;
	usuario.apellido = params.apellido;
	usuario.email = params.email;
	usuario.rol = 'ROLE_ADMIN';
	
	
	const existeEmail = await Usuario.findOne({email});

	if(existeEmail){
		res.status(400).send({message: 'El email ya existe'} );
	}else{
		if(params.clave != undefined){
		// Encriptar contraseña y guardar datos
		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(params.clave,salt,function(err, hash){
				usuario.clave = hash;
				if(usuario.nombre != null && usuario.apellido != null && usuario.email != null){
						// Guardar el usuario
						
							usuario.save((err, usuarioStored) =>{
							if(err){
								res.status(500).send({message: 'Error al guardar el usuario'});
							}else{
								if(!usuarioStored){
									res.status(404).send({message: 'No se ha registrado el usuario'});
						
								}else{
									res.status(200).send({usuario: usuarioStored});
						
								}
				
							}
							});
						
						
				}else{
					res.status(200).send({message: 'Rellena todos los campos'});
				}
			});
		});
		
	}else{
		res.status(200).send({message: 'Introduce la contraseña'});
	}
	}
}


function loginUser(req, res){
	// BODY PARSE LO CONVIERTE A OBJETO JSON
	var params = req.body;

	//console.log(params);

	var email = params.email;
	var clave = params.clave;

	
	Usuario.findOne({email}, (err, usuario) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!usuario){
				res.status(404).send({message: 'El usuario no existe'});
			}else{

				//Comprobar la contraseña
				bcrypt.compare(clave, usuario.clave ,function(err, check){
					if(check){
						//veolver los datos del usuario logeado
						if(params.gethash){
							//devolver un token de jwt
							res.status(200).send({
								token: jwt.createToken(usuario)
							});
						}else{
							res.status(200).send({usuario});
						}
					}else{
						res.status(404).send({message: 'El usuario no ha podido loguearse'});
					}

				});
			}

		}
	});		

}

function updateUser(req, res){
	var usuarioId = req.params.id;
	var actualiza = req.body;

	Usuario.findByIdAndUpdate(usuarioId, actualiza, (err,usuarioUpdate) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}else{
			if(!usuarioUpdate){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({usuario: usuarioUpdate});
			}
		}
	});

}

module.exports = {
	saveUser,
	loginUser,
	updateUser
}