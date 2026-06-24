
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, User, LogOut, Home } from "lucide-react";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="food-container py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold text-food-primary flex items-center"
          >
            <span className="mr-2">🍔</span>
            QuickBite
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-gray-700 hover:text-food-primary">
              <Home className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link to="/restaurants" className="flex items-center text-gray-700 hover:text-food-primary">
              <span>Restaurants</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/cart" 
                  className="flex items-center text-gray-700 hover:text-food-primary relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-food-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                {user?.role === "restaurant_owner" && (
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-food-primary"
                  >
                    Dashboard
                  </Link>
                )}
                
                {user?.role === "admin" && (
                  <Link 
                    to="/admin-dashboard" 
                    className="text-gray-700 hover:text-food-primary"
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="hidden md:inline text-sm text-gray-700">
                    {user?.name}
                  </span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-food-primary flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/login")}
                  className="text-food-primary border-food-primary hover:bg-food-primary hover:text-white"
                >
                  Login
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => navigate("/signup")}
                  className="bg-food-primary hover:bg-amber-500 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
