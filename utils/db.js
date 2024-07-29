/* requiring MongoDB module */
const mongodb = require('mongodb');
const { MongoClient } = mongodb;
const assert = require('assert');
class Db {
    constructor() {
        this.ObjectID = mongodb.ObjectID;
        this.dbName = `chatApp`;
        this.mongoURL = `mongodb://127.0.0.1:27017/${this.dbName}`;
    }
    connectDb(callback) {
        this.mongoClient.connect(this.mongoURL, (err, db) => {
            assert.equal(null, err);
            callback(db, this.ObjectID);
        });

        
        const uri = "mongodb+srv://root:abcde12345@cluster-0.t0xej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(err => {
            const collection = client.db("chat").collection("devices");
            // perform actions on the collection object
            client.close();
        });
    }
}
module.exports = new Db();