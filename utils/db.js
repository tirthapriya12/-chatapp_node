/* requiring MongoDB module */
const mongodb = require('mongodb');
const assert = require('assert');
class Db {
    constructor() {
        this.mongoClient = mongodb.MongoClient;
        this.ObjectID = mongodb.ObjectID;
        this.dbName = `chatApp`;
        this.mongoURL = `mongodb://127.0.0.1:27017/${this.dbName}`;
    }
    onConnect(callback) {
        this.mongoClient.connect(this.mongoURL, (err, db) => {
            assert.equal(null, err);
            callback(db, this.ObjectID);
        });
    }
}
module.exports = new Db();