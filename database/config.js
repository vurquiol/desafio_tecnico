const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');


   const dbConnection = async() => {
    
    
    const uri = "mongodb+srv://vurquiol:RH4JDWXZej527g2y@cluster0.2f3cz6z.mongodb.net/desafio_tecnico";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {
    //const collection = client.db("desafio_tecnico").collection("usuarios");
    // perform actions on the collection object
    client.close();
    });

}


module.exports = {
    dbConnection
}