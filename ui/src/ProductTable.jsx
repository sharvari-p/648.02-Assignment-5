import React from 'react';
import { Link } from 'react-router-dom';

const NO_DATA_AVAILABLE = 'No Data Available';

/**
 * Renders a single Row in the Product table
 * @param props Expects props as a 'product' object which contains
 * name, price, category and imageUrl.
 */
function ProductTableRow({ product, deleteProduct, index }) {
  const {
    name, price, category, imageUrl, id,
  } = product;
  return (
    <tr>
      <td>{name || NO_DATA_AVAILABLE}</td>
      <td>{price ? `$${price}` : NO_DATA_AVAILABLE}</td>
      <td>{category}</td>
      <td>{imageUrl ? <Link to={`/img/${id}`}>View</Link> : NO_DATA_AVAILABLE}</td>
      <td>
        <Link to={`/edit/${id}`}>Edit</Link>
        {' | '}
        <button type="button" onClick={() => { deleteProduct(index); }}>
          Delete
        </button>
      </td>
    </tr>
  );
}

/**
* Renders the Product Table
* @param props Expects 'headings' and 'products' array as props
*/
export default function ProductTable({
  headings, products, loading, deleteProduct,
}) {
  const productTableRows = products.map(
    (product, index) => (
      <ProductTableRow
        key={product.id}
        product={product}
        deleteProduct={deleteProduct}
        index={index}
      />
    ),
  );
  const initialTableMessage = loading ? 'Loading products...' : 'No Products added yet';

  return (
    <table className="table">
      <thead className="text-left bordered-table">
        <tr>
          {headings.map((heading, index) =>
            // using index as keys as Table Headings will not change dynamically
            // eslint-disable-next-line implicit-arrow-linebreak, react/no-array-index-key
            <th key={index}>{heading}</th>)}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.length > 0 ? productTableRows : (
          <tr className="text-center"><td colSpan="5">{initialTableMessage}</td></tr>
        )}
      </tbody>
    </table>
  );
}
