'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();



var usuario_routes =require('./routes/usuario');
var usuario_destino_routes =require('./routes/usuario_destino');
var transferencia_routes =require('./routes/transferencia');
var cuenta_routes =require('./routes/tipo_cuenta');
var tarjeta = require('./routes/tarjeta');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/api', usuario_routes);
app.use('/api', usuario_destino_routes);
app.use('/api', transferencia_routes); 
app.use('/api', cuenta_routes); 


module.exports = app;

