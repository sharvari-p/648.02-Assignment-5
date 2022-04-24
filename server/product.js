const mongodb = require('mongodb');
const db = require('./db');

async function getNextSequence() {
  const result = await db.getCounter().findOneAndUpdate(
    {},
    { $inc: { count: 1 } },
    { returnOriginal: false },
  );
  return result.value.count;
}

const productList = async () => {
  const result = await db.getInventory().find({}).toArray();
  return result;
};

const getProduct = async (_, { _id }) => {
  const oid = new mongodb.ObjectID(_id);
  const result = await db.getInventory().findOne(oid);
  return result;
};

const addProduct = async (_, {
  Category, Price, Name, Image,
}) => {
  const PRODUCT = {
    id: await getNextSequence(),
    Category,
    Price,
    Name,
    Image,
  };

  const result = await db.getInventory().insertOne(PRODUCT);
  const savedIssue = await db.getInventory().findOne({ _id: result.insertedId });
  return savedIssue;
};

const updateProduct = async (_, {
  _id, Category, Price, Name, Image,
}) => {
  const oid = new mongodb.ObjectID(_id);
  await db.getInventory().findOneAndUpdate({ _id: oid }, {
    $set: {
      Name,
      Image,
      Price,
      Category,
    },
  });

  const result = await db.getInventory().findOne(oid);
  return result;
};

const deleteProduct = async (_, { _id }) => {
  const oid = new mongodb.ObjectID(_id);
  const result = await db.getInventory().findOneAndDelete({ _id: oid });
  return (result.ok === 1);
};

module.exports = {
  productList, getProduct, addProduct, updateProduct, deleteProduct,
};
