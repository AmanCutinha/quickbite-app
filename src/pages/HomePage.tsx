
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, UtensilsCrossed, Clock, Star } from "lucide-react";
import { restaurants } from "@/data/mockData";
import RestaurantCard from "@/components/RestaurantCard";

const HomePage = () => {
  const navigate = useNavigate();
  const featuredRestaurants = restaurants.slice(0, 3);
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-food-primary to-food-accent py-16 md:py-24">
        <div className="food-container">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Delicious Food Delivered To Your Door
            </h1>
            <p className="text-lg mb-8 opacity-90">
              Order from your favorite restaurants and enjoy a hassle-free delivery experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-food-primary hover:bg-gray-100"
                onClick={() => navigate("/restaurants")}
              >
                Browse Restaurants
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white text-food-primary hover:bg-gray-100"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Food Background" 
            className="h-64 md:h-full object-cover"
          />
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="food-container">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-food-secondary flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-food-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Restaurants</h3>
              <p className="text-gray-600">
                Find your favorite restaurants or discover new ones nearby.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-food-secondary flex items-center justify-center mb-4">
                <UtensilsCrossed className="w-8 h-8 text-food-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Meal</h3>
              <p className="text-gray-600">
                Browse menus and select the dishes you want to order.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-food-secondary flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-food-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your food delivered to your doorstep in no time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Restaurants */}
      <section className="py-16 bg-gray-50">
        <div className="food-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Restaurants</h2>
            <Button 
              variant="link" 
              className="text-food-primary"
              onClick={() => navigate("/restaurants")}
            >
              View All
              <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
      
      {/* App Promotion */}
      <section className="py-16 bg-food-primary bg-opacity-5">
        <div className="food-container">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Get the QuickBite App</h2>
              <p className="text-gray-600 mb-6">
                Download our mobile app for a better experience. Order food anytime, anywhere with just a few taps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  App Store
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Google Play
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Mobile App" 
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="food-container">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="w-5 h-5 text-yellow-400" 
                      fill="#FACC15" 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "QuickBite has made ordering food so convenient. The delivery is always on time and the food arrives hot and fresh."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium">Customer {i}</h4>
                    <p className="text-sm text-gray-500">Regular User</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
