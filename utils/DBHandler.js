var Db = require('./db');


class DBHandler {

    constructor() { }

    connectToDB(callback) {
        Db.onConnect((db, ObjectId) => {
            this.ObjectId = ObjectId; // creates ObjectId for new document entry
            this.setDb(db);
            if(callback)
            callback(db,ObjectId);
        });
    }

    setDb(db) {
        this.db = db;
    }

    getNewObjectId() {
        return new this.ObjectId().toHexString();
    }

    insertDocument(cName, data, callback) {
        this.db.db(Db.dbName).collection(cName).insertOne(data, (err, res) => {
            if (err) throw err;
            if (callback)
                callback(res);
        });
    }

    createCollection(cName, callback) {

        this.db.db(Db.dbName).createCollection(cName, (err, res) => {
            if (err) console.log(err);
            if (callback)
                callback(res);
        });
    }

    updateDocument(cName, updateQuery, update, callback) {
        this.db.db(Db.dbName).collection(cName).updateOne(updateQuery, update, (err, res) => {
            if (err) throw err;
            if (callback)
                callback(res);
        });
    }

    deleteDocument(cName, deleteQuery) {
        this.db.db(Db.dbName).collection(cName).deleteOne(deleteQuery, (err, res) => {
            if (err) throw err;
            if (callback)
                callback(res);
        });
    }

    closeDb() {
        this.db.close();
    }

    
}

module.exports = new DBHandler();