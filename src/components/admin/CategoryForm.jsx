import { useState, useEffect } from "react";
import axios from "axios";
import "./CategoryForm.css";

const CategoryForm = ({ category, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        image: category.image || "",
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const adminToken = localStorage.getItem("adminToken");

      if (category) {
        // Update existing category
        await axios.put(
          `http://localhost:5000/api/admin/categories/${category._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          },
        );
        alert("Category updated successfully");
      } else {
        // Add new category
        await axios.post(
          "http://localhost:5000/api/admin/categories",
          formData,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          },
        );
        alert("Category added successfully");
      }

      onSubmit();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{category ? "Edit Category" : "Add Category"}</h3>
          <button onClick={onClose} className="btn-close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="category-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Category Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter category name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description"
              rows="4"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL from Cloudinary/AWS S3"
            />
            <small>Note: Provide Cloudinary or AWS S3 image URL</small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
