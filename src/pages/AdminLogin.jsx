import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";
const BASE_API_URL = import.meta.env.VITE_APP_API_URL;  
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const response = await axios.post(
        `${BASE_API_URL}/api/auth/login`,
        formData,
      );

      const { token, user } = response.data;

      // Check if user is admin
      if (user.role !== "admin") {
        setError("Access denied. Admin privileges required.");
        setLoading(false);
        return;
      }

      // Store token and user in localStorage
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));

      // Navigate to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response?.data?.message || "Login failed");
      } else if (err.request) {
        setError(
          "Failed to connect to server. Make sure backend is running on http://localhost:5000",
        );
      } else {
        setError(err.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your admin email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="info-text">
          Need admin access? Contact your administrator.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
