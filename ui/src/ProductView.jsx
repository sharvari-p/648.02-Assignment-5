import React, { Component } from 'react'
import graphQLFetch from './graphQLFetch';

export default class ProductView extends Component {

	state = { product: {} }

	constructor(props) {
		super(props);
		const _id = props.location.pathname.split("/view/")[1];
		this.getProduct(_id);
	}

	getProduct(_id) {
		const query = `
		query {
			getProduct (_id: "${_id}") {
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
			this.setState((state, props) => state.product = res.data.getProduct)
		})
		.catch(err => console.error(err))
	}

	render() {
		const {Name, Image, Category, Price} = this.state.product;
		return (
			<div>
				<h2>Product Details</h2>
				<hr/>
				<h3>Name: {Name}</h3>
				<img src={Image} alt=""/>
				<p>Category: {Category}</p>
				<p>Price: ${Price}</p>
			</div>
		)
	}
}
