import { Shield, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-blue-400" />
          <span className="text-xl font-bold">SecureScanner</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          {isAuthenticated && ( // Show only if user is authenticated
            <Link to="/vulnerability" className="hover:text-blue-400 transition-colors">
              Find Vulnerability
            </Link>
          )}
          {isAuthenticated && ( // Show only if user is authenticated
            <Link to="/phishing" className="hover:text-blue-400 transition-colors">
              Phishing Attack
            </Link>
          )}
          <Link to="/contact" className="hover:text-blue-400 transition-colors">
            Contact
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
