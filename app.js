'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var usuario_routes =require('./routes/usuario');
var usuario_destino_routes =require('./routes/usuario_destino');
var transferencia_routes =require('./routes/transferencia');
var ttransferencia_routes = require('./routes/tipo_cuenta');
var tarjeta = require('./routes/tarjeta');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras http

//Ruta base
app.use('/api', usuario_routes);
app.use('/api', usuario_destino_routes);
app.use('/api', ttransferencia_routes); 
app.use('/api', tarjeta); 


module.exports = app;

