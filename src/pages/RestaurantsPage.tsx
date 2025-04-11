import React, { useEffect, useState } from "react";

type Restaurant = {
  restaurant_id: number;
  name: string;
  location: string;
  owner_id: number;
};

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) =>
        console.error("Error fetching restaurants:", err.message)
      );
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Restaurants 🍽️</h2>
      <ul className="space-y-2">
        {restaurants.map((rest) => (
          <li
            key={rest.restaurant_id}
            className="p-3 border rounded shadow hover:bg-gray-50"
          >
            <strong>{rest.name}</strong> - {rest.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsPage;

