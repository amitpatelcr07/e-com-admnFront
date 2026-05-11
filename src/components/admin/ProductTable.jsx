import "./ProductTable.css";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Rating</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="name-cell">{product.name}</td>
              <td>{product.category?.name || "Unknown"}</td>
              <td className="price-cell">₹{product.price}</td>
              <td className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
                {product.stock}
              </td>
              <td className="image-cell">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  "No image"
                )}
              </td>
              <td className="rating-cell">
                {"⭐".repeat(Math.floor(product.rating)) || 0}
              </td>
              <td>{new Date(product.createdAt).toLocaleDateString()}</td>
              <td className="actions-cell">
                <button onClick={() => onEdit(product)} className="btn-edit">
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
