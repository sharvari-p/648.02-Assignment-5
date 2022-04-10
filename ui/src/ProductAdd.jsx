/* eslint linebreak-style: ["error","windows"] */

import React from 'react';

export default class AddProduct extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAddForm;
    const product = {
      Name: form.product.value,
      Price: form.price.value.slice(1),
      Category: form.category.value,
      Image: form.image.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.price.value = '$';
    form.product.value = '';
    form.image.value = '';
  }

  render() {
    return (
      <div>
        <form name="productAddForm" className="formAdd" onSubmit={this.handleSubmit}>
          <div>
            <p>
              <label htmlFor="category">
                Category
                <br />
                <select id="prdCat" name="category">
                  <option value="shirt">Shirts</option>
                  <option value="jeans">Jeans</option>
                  <option value="jacket">Jackets</option>
                  <option value="sweater">Sweaters</option>
                  <option value="accessories">Accessories</option>
                </select>
              </label>
            </p>
            <p>
              <label htmlFor="price">
                Price Per Unit
                <br />
                <input type="text" name="price" defaultValue="$" />
              </label>
            </p>
            <p>
              <input type="submit" id="btnAdd" value="Add Product" />
            </p>
          </div>
          <div>
            <p>
              <label htmlFor="name">
                Product Name
                <br />
                <input type="text" name="product" />
              </label>
            </p>
            <p>
              <label htmlFor="image">
                Image URL
                <br />
                <input type="text" name="image" />
              </label>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
