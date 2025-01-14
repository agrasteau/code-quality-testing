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
    <nav className="mb-5 flex items-center justify-between bg-gray-800 p-4">
      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link to="/users" className="text-white transition hover:text-gray-300">
          Users
        </Link>
        <Link to="/products" className="text-white transition hover:text-gray-300">
          Products
        </Link>
      </div>

      {/* User Info and Logout */}
      <div className="flex items-center gap-6">
        <span className="text-white" aria-label={`Welcome, ${user ? user.firstname : 'User'}!`}>
          Welcome, {user ? user.firstname : 'User'}!
        </span>
        <button
          onClick={handleLogout}
          className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          aria-label="Log out of your account"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
