import React, { Component, Fragment } from 'react'

import ProductAdd from './ProductAdd.jsx'
import ProductTable from './ProductTable.jsx'

import graphQLFetch from './graphQLFetch'

export default class ProductList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
		this.addProduct = this.addProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.getProducts()
	}

	getProducts() {
		const query = `
		query {
			productList {
				_id
				id
				Category
				Price
				Name
				Image
			}
		}
		`;

		graphQLFetch(query)
		.then((res) => {
			this.setState((state, props) => {
				state.products = res.data.productList;
				return state;
			})
		})
		.catch(err => console.error(err))
	}

	addProduct(product) {
		const query = `
		mutation {
			addProduct (
				Category: [` + product.Category + `]
				Name: "` + product.Name + `"
				Price: ` + product.Price + `
				Image: "` + product.Image + `"
			) {
				_id
				id
				Category
				Price
				Name
				Image
			}
		}
		`;

		graphQLFetch(query)
		.then((res) => {
			this.setState((state, props) => {
				state.products.push(res.data.addProduct);
				return state;
			})
		})
		.catch(err => console.error(err))
	}

	deleteProduct(_id) {
		const query = `mutation { deleteProduct (_id: "${_id}") }`

		graphQLFetch(query)
		.then((res) => {
			if (res.data.deleteProduct) {
				alert("Deleted Successfully")
				this.getProducts();
			}
		})
		.catch(err => console.error(err))

	} 

	render() {
		return (
			<Fragment>
				<h2>My Company Inventory</h2>
				<ProductTable products={this.state.products} deleteProduct={this.deleteProduct} />
				<ProductAdd addProduct={this.addProduct} />
			</Fragment>
		)
	}
}