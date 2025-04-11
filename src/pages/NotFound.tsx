
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center">
        <div className="text-6xl font-bold text-food-primary mb-6">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate("/")}
            className="bg-food-primary hover:bg-amber-500 flex items-center justify-center"
          >
            <Home className="mr-2 w-5 h-5" />
            Go Home
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/restaurants")}
            className="flex items-center justify-center"
          >
            <Search className="mr-2 w-5 h-5" />
            Browse Restaurants
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
