'use strict'

var express = require('express');
var TarjetaController = require('../controllers/tarjeta');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/tarjeta/:id', md_auth.ensureAuth, TarjetaController.getTarjeta);
api.post('/registrar-tarjeta', TarjetaController.saveTarjeta);

module.exports = api;
