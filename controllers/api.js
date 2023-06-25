const MongoClient = require('mongodb').MongoClient;

require("dotenv").config()

let db,
dbName = "test";

MongoClient.connect(
    process.env.MONGO_URI, { 
    useUnifiedTopology: true,
    useNewUrlParser: true})
        .then(client => {
            db = client.db(dbName);
        })


const getCollectionData = async (collectionName) => {
    try{
        const data = await db.collection(collectionName).find().toArray();
        return data;
    }catch(err){
        return res.status(500).json({
            message: err
        });
    }
}

module.exports = {
    fetchAppt: async(req,res)=>{
        try{    
            const data = await getCollectionData("appts");
            res.json(data);
        }catch(err){
            res.status(500).send(err);
        }
    }
}