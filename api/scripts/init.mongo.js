/* global db print */
/* eslint no-restricted-globals: "off" */

db.products.remove({});
db.deleted_products.remove({});

const initialProducts = [
  {
    id: 1,
    name: "Denim",
    category: 'Jeans',
    price: '120',
    imageUrl: 'https://picsum.photos/500/500',
  },
  {
    id: 2,
    name: 'Calvin Klein',
    category: 'Shirts',
    price: '145',
    imageUrl: 'https://picsum.photos/500/500',
  },
];

db.products.insertMany(initialProducts);
const count = db.products.count();
print('Inserted total of ', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });

db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ category: 1 });
db.deleted_products.createIndex({ id: 1 }, { unique: true });
