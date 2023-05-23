const { MongoClient } = require('mongodb')
const _uri = "mongodb://0.0.0.0:27017";
const _db = 'news_scrapping';
const dbConnection = (collection, cb) => {
    MongoClient.connect(_uri).then(async (client) => {
        const db = await client.db(_db).collection(collection);
        await cb(db);
        await client.close();
    }).catch();
}

module.exports = dbConnection;