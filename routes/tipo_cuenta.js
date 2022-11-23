'use strict'

var express = require('express');
var TipoCuentaController = require('../controllers/tipo_cuenta');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/tipocuenta/:id', md_auth.ensureAuth, TipoCuentaController.getTipoCuenta);
api.get('/cuentas', md_auth.ensureAuth, TipoCuentaController.getCuentas);
api.post('/registrar-tipocuenta', TipoCuentaController.saveTipoCuenta);

module.exports = api;
