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

//Cabeceras http
app.use((req,res,next) => {
	res.header('Access-Cntrol-Allow-Origin','*');
	res.header('Access-Cntrol-Allow-Headers','Authorization, X-API-KEY, Origin, X-Rquested-With, Content-Type, Accept, Access-Control-Allow-Request-Methord');
	res.header('Access-Cntrol-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});


app.use('/api', usuario_routes);
app.use('/api', usuario_destino_routes);
app.use('/api', ttransferencia_routes); 
app.use('/api', tarjeta); 


module.exports = app;

