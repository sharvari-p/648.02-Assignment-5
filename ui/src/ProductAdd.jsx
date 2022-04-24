import React, { Component } from 'react'

export default class ProductAdd extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const product = {
			Category: document.getElementById("category").value,
			Price: document.getElementById("price").value.slice(1),
			Name: document.getElementById("name").value,
			Image: document.getElementById("image").value
		}
		this.props.addProduct(product);
	}

	render() {
		return (
			<section>
				<p>Add a new product to inventory</p>
				<hr />
				<form>
					<div className="input-group">
						<label htmlFor="category">Category:</label>
						<select name="category" id="category">
							<option value="Accessories">Accessories</option>
							<option value="Shirts">Shirts</option>
							<option value="Jeans">Jeans</option>
							<option value="Jackets">Jackets</option>
							<option value="Sweaters">Sweaters</option>
						</select>
					</div>
					<div className="input-group">
						<label htmlFor="price">Price:</label>
						<input type="text" id="price" defaultValue="$" />
					</div>
					<div className="input-group">
						<label htmlFor="name">Product Name:</label>
						<input type="text" id="name" />
					</div>
					<div className="input-group">
						<label htmlFor="image">Image URL:</label>
						<input type="text" id="image" />
					</div>

					<button type="submit" onClick={this.onSubmit}>Add Product</button>
				</form>
			</section>
		)
	}
}