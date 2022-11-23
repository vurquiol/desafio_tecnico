'user strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var Transferencia = require('../models/transferencia');
var Usuario = require('../models/usuario');
var jwt = require('../services/jwt');
var moongosePaginate = require('mongoose-pagination');
const moment = require('moment');
const current = moment().utc().format('D-M-Y H:M:S');
const saltRounds = 10;

const guardarTransferencia = async(req,res) => {
	var transferencia = new Transferencia();
	var usuario = new Usuario();
 	
	var params = req.body;
	let usuarioId = req.params.id;
	
	transferencia.nombre = params.nombre;	
	transferencia.rut = params.rut;
	transferencia.correo = params.correo;
	transferencia.banco_destino = params.banco_destino;
	transferencia.tipo_cuenta = params.tipo_cuenta;
	transferencia.monto = params.monto;
	
	
		if(transferencia.nombre != null 
					&& transferencia.rut != null 
					&& transferencia.correo != null 
					&& transferencia.monto != null
					&& transferencia.banco_destino != null
					&& transferencia.tipo_cuenta != null
					){

					Usuario.findOne({_id:usuarioId}, (err, usuario) => {
						if(err){
							res.status(500).send({message: 'Error en la petición'});
						}else{
							if(!usuario){
								res.status(404).send({message: 'El usuario no existe'});
							}else{	
								
								let saldoActual = usuario.saldo;
								transferencia.rut_origen = usuario.rut;
								transferencia.fecha_transaccion = moment().format('MMMM Do YYYY, h:mm:ss a');  
								
								if(transferencia.monto > saldoActual){

									res.status(500).send({message: 'Saldo insuficiente'});

								}else{
													
												let saldoFinal = parseInt(usuario.saldo) - parseInt(transferencia.monto);
																	
															
												const filter = { _id:usuarioId };
												const update = { saldo: saldoFinal };

												transferencia.save((err, transferenciaStored) =>{										
													if(err){
															res.status(500).send({message: 'Error al guardar transacción'});
													}else{
														if(!transferenciaStored){
															res.status(404).send({message: 'No se ha guardado la transacción'});
																
														}else{
																Usuario.findByIdAndUpdate(filter, update, (err,actualizarUsuarioSaldo) => {
																if(err){
																	res.status(500).send({message: err+'Error al actualizar el saldo'});
																}else{
																	if(!actualizarUsuarioSaldo){
																		res.status(404).send({message: 'No se ha podido actualizar el saldo'});
																	}else{		
																			Usuario.findOne({_id:usuarioId}, (err, usuario) => {
																			if(err){
																				res.status(500).json({error: 'Ha Ocurrido un error'});  
																			}else{	
																				if(!usuario){
																					res.status(404).send({message: 'No se ha guardado la transacción'});
																						
																				}else{
																					res.status(200).send({usuario: usuario});
																				}															
																				
																			}
																		});
																	}
																		
																}
																															
																});	
														}	
													}
												});
												
												
											
												
																						
										}
							}
						}
					});	
					
										

		}else{
						res.status(200).send({message: 'Rellena los campos requeridos'});
		}
		// Monto tiene que ser menor a saldo
					
}


function getHistorialTransferencia(req,res){
	

		let usuarioId = req.params.id;
		console.log(usuarioId);
		Usuario.findOne({_id:usuarioId}, (err, usuario) => {
		if(err){
			res.status(500).json({error: 'Ha Ocurrido un error'});  
		}else{	
			if(!usuario){
				res.status(404).send({message: 'No se ha guardado la transacción'});
																						
			}else{
				Transferencia.find({rut_origen: usuario.rut},function(err,transferencia,total){
				if(err){
					res.status(500).send({message: 'Error en la peticion'});
				}else{
					if(!transferencia){
						res.status(404).send({message: 'No hay transferencias'});
								
					}else{
						return res.status(200).send({
							total_items: total,
							transferencia: transferencia});
							
					}
						
				}
			});
	}															
	}
	});

}



module.exports = {
	guardarTransferencia,
	getHistorialTransferencia
}