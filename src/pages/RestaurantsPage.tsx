import React, { useEffect, useState } from "react";

type Restaurant = {
  restaurant_id: number;
  name: string;
  location: string;
  cuisine: string;
  rating: number;
};

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.restaurant_id} className="border p-4 rounded-lg">
            <img
              src={`https://source.unsplash.com/400x300/?restaurant,food,${restaurant.name}`}
              alt={restaurant.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 text-xl font-semibold">{restaurant.name}</h3>
            <p className="text-gray-600">{restaurant.location}</p>
            <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
            <p className="mt-1">⭐ {restaurant.rating?.toFixed(1) || "4.0"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsPage;
