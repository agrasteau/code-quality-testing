// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

const Navigation = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 mb-5 flex justify-between items-center">
      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link
          to="/users"
          className="text-white hover:text-gray-300 transition"
        >
          Users
        </Link>
        <Link
          to="/products"
          className="text-white hover:text-gray-300 transition"
        >
          Products
        </Link>
      </div>

      {/* User Info and Logout */}
      <div className="flex items-center gap-6">
        <span
          className="text-white"
          aria-label={`Welcome, ${user ? user.firstname : 'User'}!`}
        >
          Welcome, {user ? user.firstname : 'User'}!
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          aria-label="Log out of your account"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
