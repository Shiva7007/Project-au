const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0";

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
var dbFirst,dbSecond; 

MongoClient.connect(uri, options, function (err, database) {
  if (err) throw err;

  dbFirst = database.db("test");
  if (dbFirst) console.log("dbFirst connected");
  module.exports.dbFirst = dbFirst;
});

MongoClient.connect(uri, options, function (err, database) {
  if (err) throw err;

  dbSecond = database.db("test2");
  if (dbSecond) console.log("dbSecond connected");
  module.exports.dbSecond = dbSecond;
});
