import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const adminToken = localStorage.getItem("adminToken");
  const adminUser = localStorage.getItem("adminUser");

  if (!adminToken || !adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const user = JSON.parse(adminUser);
    if (user.role !== "admin") {
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
