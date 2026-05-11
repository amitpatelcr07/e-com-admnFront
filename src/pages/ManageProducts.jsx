import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }

    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/admin/products",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      setProducts(response.data.products);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = async () => {
    handleFormClose();
    await fetchProducts();
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const adminToken = localStorage.getItem("adminToken");
        await axios.delete(
          `http://localhost:5000/api/admin/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          },
        );

        await fetchProducts();
        alert("Product deleted successfully");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete product");
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
            <h2>Manage Products</h2>
            <button onClick={handleAddProduct} className="btn-primary">
              Add Product
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {showForm && (
            <ProductForm
              product={editingProduct}
              onClose={handleFormClose}
              onSubmit={handleFormSubmit}
            />
          )}

          {loading ? (
            <div className="loading">Loading...</div>
          ) : products.length > 0 ? (
            <ProductTable
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ) : (
            <div className="empty-state">
              <p>No products found. Create your first product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
