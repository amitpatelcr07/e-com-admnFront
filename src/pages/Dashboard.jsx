import { useNavigate } from "react-router-dom";
import { clearAuthToken } from "../utils/authStorage";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Shopingo!
          </h1>
          <p className="text-gray-600 mb-6">
            You are now logged in and can see the dashboard.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
