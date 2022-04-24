const { MongoClient } = require('mongodb');

const client = new MongoClient(`mongodb+srv:/sharvarip:${process.env.MONGO_PASS}@cluster0.hvwfi.mongodb.net/assignment-4`, {
  useUnifiedTopology: true,
});


let inventory; let
  counter;
client.connect((err, cl) => {
  const db = cl.db();
  inventory = db.collection('inventory');
  counter = db.collection('counter');
});

function getInventory() { return inventory; }
function getCounter() { return counter; }

module.exports = { getCounter, getInventory };
