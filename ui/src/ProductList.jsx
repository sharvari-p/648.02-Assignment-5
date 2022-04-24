import React from 'react';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';

const productTableHeadings = ['Product Name', 'Price', 'Category', 'Image'];

/**
 * Entry Point of our Application. Renders the whole page from here.
 */
export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [], initialLoading: true };
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `
            query {
                productList {
                    id
                    name
                    category
                    price
                    imageUrl
                }
            }
        `;

    const data = await graphQLFetch(query);

    if (data) {
      this.setState({ products: data.productList, initialLoading: false });
    }
  }

  async addProduct(product) {
    const query = `
            mutation addProduct($product: ProductInputs!) {
                addProduct(product: $product) {
                    id
                }
            }
        `;

    const data = await graphQLFetch(query, { product });
    if (data) {
      this.loadData();
    }
  }

  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = products[index];

    const data = await graphQLFetch(query, { id });
    if (data && data.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        return { products: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { products, initialLoading } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <h2>My Company Inventory</h2>
          <div>Showing all available products</div>
          <hr />
          <ProductTable
            headings={productTableHeadings}
            products={products}
            loading={initialLoading}
            deleteProduct={this.deleteProduct}
          />
          <div>Add a new Product</div>
          <hr />
          <ProductAdd addProduct={this.addProduct} />
        </div>
      </React.Fragment>
    );
  }
}
