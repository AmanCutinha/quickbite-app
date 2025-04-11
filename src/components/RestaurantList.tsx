import React, { useEffect, useState } from 'react';

type Restaurant = {
  restaurant_id: number;
  name: string;
  location: string;
  owner_id: number;
};

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/restaurants')
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error('Error fetching restaurants:', err));
  }, []);

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map((rest) => (
          <li key={rest.restaurant_id}>
            🍽️ <strong>{rest.name}</strong> - {rest.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
