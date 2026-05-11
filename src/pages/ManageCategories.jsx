import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import CategoryForm from "../components/admin/CategoryForm";
import CategoryTable from "../components/admin/CategoryTable";
import "./ManageCategories.css";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }

    fetchCategories();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/admin/categories",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      setCategories(response.data.categories);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch categories");
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleFormSubmit = async () => {
    handleFormClose();
    await fetchCategories();
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const adminToken = localStorage.getItem("adminToken");
        await axios.delete(
          `http://localhost:5000/api/admin/categories/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          },
        );

        await fetchCategories();
        alert("Category deleted successfully");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete category");
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader />
        <div className="admin-content">
          <div className="content-header">
            <h2>Manage Categories</h2>
            <button onClick={handleAddCategory} className="btn-primary">
              Add Category
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {showForm && (
            <CategoryForm
              category={editingCategory}
              onClose={handleFormClose}
              onSubmit={handleFormSubmit}
            />
          )}

          {loading ? (
            <div className="loading">Loading...</div>
          ) : categories.length > 0 ? (
            <CategoryTable
              categories={categories}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          ) : (
            <div className="empty-state">
              <p>No categories found. Create your first category!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
