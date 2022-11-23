const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');


   const dbConnection = async() => {
    
    
    const uri = process.env.DB_CNN;
     await mongoose.connect(process.env.DB_CNN);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
   

}


module.exports = {
    dbConnection
}