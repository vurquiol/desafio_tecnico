'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
var app = require('./app');

const { dbConnection } = require('./database/config');

// Crear el servidor de express


// Configurar CORS


// Base de datos
dbConnection();


app.listen(process.env.PORT || 3005, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT || 3005 );
});

