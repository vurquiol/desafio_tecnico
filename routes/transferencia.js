'use strict'

var express = require('express');
var TransferenciaController = require('../controllers/transferencia');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.post('/registrar-transferencia/:id', TransferenciaController.guardarTransferencia);
api.post('/historial/:id', TransferenciaController.getHistorialTransferencia);
//api.post('/logear', UsuarioController.loginUser);
//api.put('/actualiza-usuario/:id',  md_auth.ensureAuth, UsuarioController.updateUser);
//api.put('/actualiza-saldo/:id',  md_auth.ensureAuth, UsuarioController.updateSaldo);
module.exports = api;
