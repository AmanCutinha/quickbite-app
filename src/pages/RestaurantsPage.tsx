import React, { useEffect, useState } from "react";
import RestaurantCard, { Restaurant } from "@/components/RestaurantCard";

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <div className="food-container py-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center">Browse Restaurants</h2>
      
      {restaurants.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No restaurants found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.restaurant_id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
