import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import "./AdminDashboard.css";
const BASE_API_URL=import.meta.env.VITE_APP_API_URL  

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(
    "AdminDashboard component rendered",
    import.meta.REACT_APP_API_URL,
  );
  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }

    fetchDashboardStats();
  }, [navigate]);

  const fetchDashboardStats = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.get(
        `${BASE_API_URL}/api/admin/dashboard/stats`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );
      console.log("Dashboard stats API called");
       console.log("Dashboard stats response:", response.data);
      setStats(response.data.stats);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError(err.response?.data?.message || "Failed to fetch stats");
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader />
        <div className="admin-content">
          <h2>Dashboard</h2>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading...</div>
          ) : stats ? (
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Products</h3>
                <p className="stat-number">{stats.totalProducts}</p>
              </div>
              <div className="stat-card">
                <h3>Total Categories</h3>
                <p className="stat-number">{stats.totalCategories}</p>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p className="stat-number">{stats.totalOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Total Revenue</h3>
                <p className="stat-number">₹{stats.totalRevenue || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Completed Orders</h3>
                <p className="stat-number">{stats.completedOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Orders</h3>
                <p className="stat-number">{stats.pendingOrders}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
