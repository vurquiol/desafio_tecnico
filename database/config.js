const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const dbConnection = async() => {
    
    try{
        const conexion = await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
          });
         console.log('MongoDB connected...', conexion.connection.host);
    }catch (error){
        console.log(error);
    }
    

};


module.exports = dbConnection;