'user strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var UsuarioDestino = require('../models/usuario_destino');
var Usuario = require('../models/usuario');
var jwt = require('../services/jwt');


const saltRounds = 10;

const saveRecipient = async(req,res) => {
	var usuarioDestino = new UsuarioDestino();

	var params = req.body;

	usuarioDestino.nombre = params.nombre;
	usuarioDestino.rut = params.rut;
	usuarioDestino.correo = params.correo;	
	usuarioDestino.telefono = params.telefono;
	usuarioDestino.banco_destino = params.banco_destino;
	usuarioDestino.tipo_cuenta = params.tipo_cuenta;
	usuarioDestino.numero_cuenta = params.numero_cuenta;
	
	

	const existeRut = await UsuarioDestino.findOne({rut:  usuarioDestino.rut});

	if(existeRut){
		res.status(400).send({message: 'El usuario ya esta agregado como destinatario'} );
	}else{
		
		// Encriptar contraseña y guardar datos		
				if(usuarioDestino.nombre != null 
					&& usuarioDestino.rut != null 
					&& usuarioDestino.correo != null 
					&& usuarioDestino.telefono != null
					&& usuarioDestino.banco_destino != null
					&& usuarioDestino.tipo_cuenta != null
					&& usuarioDestino.numero_cuenta != null){
						// Guardar el usuario
						
							usuarioDestino.save((err, usuarioDestinoStored) =>{
							if(err){								
								res.status(500).send({message: 'Error al guardar el destinatario'});
							}else{
								if(!usuarioDestinoStored){
									res.status(404).send({message: 'No se ha registrado el destinatario'});
						
								}else{
									res.status(200).send({usuarioDestino: usuarioDestinoStored});
						
								}
				
							}
							});
						
						
				}else{
					res.status(200).send({message: 'Rellena los campos requeridos'});
				}
	}
		
}


function updateRecipient(req, res){
	var destinatarioId = req.params.id;
	var actualiza = req.body;

	UsuarioDestino.findByIdAndUpdate(destinatarioId, actualiza, (err,actualizarDestinatario) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}else{
			if(!actualizarDestinatario){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({usuario_destino: actualizarDestinatario});
			}
		}
	});

}

function deleteRecipient(req,res) {
    var destinatarioId= req.params.id;

    UsuarioDestino.findByIdAndRemove(destinatarioId,(err,eliminarDestinatario)=>{
        if (err) {
            res.status(500).send({message:'Error en eliminar destinatario'});
            
        } else {
            if (!eliminarDestinatario) {
                res.status(404).send({message:'El destinatario no ha sido eliminado'});
                
            } else {
                
               return res.status(200).send({usuario_destino : eliminarDestinatario}); 
            }
        }
    });
}

function getUsuarioDestino(req,res) {

	var usuarioId= req.params.id;
	var params = req.body;
	
		Usuario.findOne({_id:usuarioId}, (err, usuario) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!usuario){
				res.status(404).send({message: 'El usuario no existe'});
			}else{	
				UsuarioDestino.find({rut_origen:usuario.rut},(err, usuarioDestinoStored) => {
					if(err){
						res.status(500).send({message: 'Error al buscar el usuario destino'});
					}else{
						if(!usuarioDestinoStored){
							res.status(404).send({message: 'No existe el usuario destino'});
						
						}else{
							res.status(200).send({usuario_destino:usuarioDestinoStored});
						}
					}
				});			
			}

		}
		});		
				
			
													

	
}

module.exports = {
	saveRecipient,
	updateRecipient,
	deleteRecipient,
	getUsuarioDestino
}