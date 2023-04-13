import { MongoClient } from "mongodb";

let db;

 async function connectTodb(cb){
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.u5pvfie.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();
    db = client.db('react-blog-db');
    cb();

}

export{
    db,
    connectTodb,
};