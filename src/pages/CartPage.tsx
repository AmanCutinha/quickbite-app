
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import CartItem from "@/components/CartItem";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Restaurant } from "@/components/RestaurantCard";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, totalItems, totalPrice, clearCart, restaurantId } = useCart();
  const { isAuthenticated } = useAuth();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    if (restaurantId) {
      fetch(`http://localhost:5000/restaurants/${restaurantId}`)
        .then((res) => res.json())
        .then((data) => setRestaurant(data))
        .catch((err) => console.error("Error fetching restaurant in cart:", err));
    } else {
      setRestaurant(null);
    }
  }, [restaurantId]);
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to place an order",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    // In a real app, this would proceed to a checkout page
    // For now, we'll just simulate an order confirmation
    clearCart();
    navigate("/order-confirmation");
  };
  
  if (cart.length === 0) {
    return (
      <div className="food-container py-16 text-center animate-fade-in">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button 
            onClick={() => navigate("/restaurants")}
            className="bg-food-primary hover:bg-amber-500"
          >
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="food-container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {restaurant && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center">
                <img 
                  src={restaurant.hero_image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1'} 
                  alt={restaurant.name} 
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="font-semibold">{restaurant.name}</h3>
                  <p className="text-sm text-gray-500">{restaurant.cuisine} • {restaurant.delivery_time}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Order Items ({totalItems})</h2>
            
            <div className="space-y-2">
              {cart.map((item) => (
                <CartItem key={item.menuItem.id} item={item} />
              ))}
            </div>
            
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="text-red-500 hover:text-red-600"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>$3.99</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(totalPrice + 3.99 + totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6 bg-food-primary hover:bg-amber-500"
              onClick={handleCheckout}
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              By placing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
