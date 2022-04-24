import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

class ProductRow extends Component {
	constructor(props) {
		super(props);
		this.onDelete = this.onDelete.bind(this);
	}

	onDelete() {
		this.props.deleteProduct(this.props.product._id)
	}

	render() {
		const { _id, Name, Price, Category, Image } = this.props.product;
		
		return (
			<tr>
				<td>{ Name }</td>
				<td>${ Price }</td>
				<td>{ Category }</td>
				<td><Link to={`/view/${_id}`}>View</Link></td>
				<td><Link to={`/edit/${_id}`}>Edit</Link> / <button className="link" onClick={this.onDelete}>Delete</button></td>
			</tr>
		)
	}
}

export default withRouter(ProductRow)