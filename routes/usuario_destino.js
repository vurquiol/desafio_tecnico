'use strict'

var express = require('express');
var UsuarioDestinoController = require('../controllers/usuario_destino');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.post('/registrar-destinatario', UsuarioDestinoController.saveRecipient);
api.put('/actualizar-destinatario/:id',  md_auth.ensureAuth, UsuarioDestinoController.updateRecipient);
api.delete('/eliminar-destinatario/:id',md_auth.ensureAuth,UsuarioDestinoController.deleteRecipient); 

module.exports = api;
