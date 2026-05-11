import "./CategoryTable.css";

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Created By</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td className="name-cell">{category.name}</td>
              <td className="description-cell">
                {category.description || "N/A"}
              </td>
              <td className="image-cell">
                {category.image ? (
                  <img src={category.image} alt={category.name} />
                ) : (
                  "No image"
                )}
              </td>
              <td>{category.createdBy?.name || "Unknown"}</td>
              <td>{new Date(category.createdAt).toLocaleDateString()}</td>
              <td className="actions-cell">
                <button onClick={() => onEdit(category)} className="btn-edit">
                  Edit
                </button>
                <button
                  onClick={() => onDelete(category._id)}
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

export default CategoryTable;
