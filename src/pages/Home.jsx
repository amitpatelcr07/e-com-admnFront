import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to Shopingo
        </h1>
        <p className="text-xl mb-8">Your online shopping destination</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition inline-block"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
