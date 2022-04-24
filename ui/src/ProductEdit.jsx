import React, { Component } from 'react'
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class ProductEdit extends Component {

	state = { product: {} }

	constructor(props) {
		super();
		const _id = props.location.pathname.split("/edit/")[1];
		this.getProduct(_id);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
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
				this.setState((state, props) => {
					state["product"] = res.data.getProduct;
					return state;
				})
			})
			.catch(err => console.error(err))
	}

	onSubmit(e) {
		e.preventDefault();

		const product = {
			Category: document.getElementById("category").value,
			Price: document.getElementById("price").value,
			Name: document.getElementById("name").value,
			Image: document.getElementById("image").value
		}

		const query = `
		mutation {
			updateProduct (
				Category: [${product.Category}]
				_id: "${this.state.product._id}"
				Name: "${product.Name}"
				Price: ${product.Price}
				Image: "${product.Image}"
			  ) {
				_id
				Category
				Price
				Name
				Image
			  }
		}
		`;

		graphQLFetch(query)
			.then((res) => {
				// console.log(res);
				alert("Updated Successfully!");
				this.setState((state, props) => {
					state.product = res.data.updateProduct;
					return state;
				})
			})
			.catch(err => console.error(err))
	}

	onChange(event, naturalValue) {
		const { name, value: textValue } = event.target;
		const value = naturalValue === undefined ? textValue : naturalValue;
		this.setState((state, props) => state.product[name] = value)
	}

	render() {
		const { Name, Price, Category, Image, id } = this.state.product;
		return (
			<div>
				<h2>Update Product</h2>
				<form>
					<div className="input-group">
						<label htmlFor="category">Category:</label>
						<select name="category" id="category" defaultValue={Category}>
							<option value="Accessories">Accessories</option>
							<option value="Shirts">Shirts</option>
							<option value="Jeans">Jeans</option>
							<option value="Jackets">Jackets</option>
							<option value="Sweaters">Sweaters</option>
						</select>
					</div>
					<div className="input-group">
						<label htmlFor="price">Price:</label>
						<NumInput name="price" id="price" key={id} onChange={this.onChange} value={Price}></NumInput>
					</div>
					<div className="input-group">
						<label htmlFor="name">Product Name:</label>
						<TextInput name="name" id="name" key={id} value={Name} onChange={this.onChange}></TextInput>
					</div>
					<div className="input-group">
						<label htmlFor="image">Image URL:</label>
						<input type="text" id="image" defaultValue={Image} />
					</div>

					<button type="submit" onClick={this.onSubmit}>Update Product</button>
				</form>
			</div>
		)
	}
}
