
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const orderNumber = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
  
  // Set page title
  useEffect(() => {
    document.title = "Order Confirmed | QuickBite";
    
    // Reset title when component unmounts
    return () => {
      document.title = "QuickBite";
    };
  }, []);
  
  return (
    <div className="food-container py-16 animate-fade-in">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        
        <p className="text-xl text-gray-700 mb-8">
          Thank you for your order. Your food is being prepared and will be delivered soon.
        </p>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          
          <div className="flex justify-between items-center border-b border-gray-100 py-3">
            <span className="text-gray-600">Order Number</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-100 py-3">
            <span className="text-gray-600">Estimated Delivery</span>
            <span className="font-medium">30-45 minutes</span>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-600">Order Status</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
              Preparing
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/")}
            className="flex items-center justify-center"
          >
            <Home className="mr-2 w-5 h-5" />
            Back to Home
          </Button>
          
          <Button 
            variant="default" 
            size="lg"
            onClick={() => navigate("/restaurants")}
            className="flex items-center justify-center bg-food-primary hover:bg-amber-500"
          >
            <ShoppingBag className="mr-2 w-5 h-5" />
            Order More Food
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
