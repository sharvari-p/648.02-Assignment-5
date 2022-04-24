const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const product = require('../product');

const resolvers = {
  Query: {
    productList: product.productList,
    getProduct: product.getProduct,
  },
  Mutation: {
    addProduct: product.addProduct,
    updateProduct: product.updateProduct,
    deleteProduct: product.deleteProduct,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
  resolvers,
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
