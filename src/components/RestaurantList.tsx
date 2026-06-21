import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AddRestaurantForm from '@/components/AddRestaurantForm'; // ✅ import the form

type Restaurant = {
  restaurant_id: number;
  name: string;
  location: string;
  owner_id: number;
};

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const { user } = useAuth();

  const fetchRestaurants = () => {
    fetch('http://localhost:5000/restaurants')
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error('Error fetching restaurants:', err));
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleEdit = (restaurantId: number) => {
    console.log('Edit restaurant', restaurantId);
    // Optional: add edit logic or modal
  };

  const handleDelete = async (restaurantId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/restaurants/${restaurantId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchRestaurants();
      } else {
        console.error('Failed to delete restaurant');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Restaurants</h2>

      {/* Show form only if user is a restaurant owner */}
      {user?.role === 'restaurant_owner' && (
        <AddRestaurantForm onRestaurantAdded={fetchRestaurants} />
      )}

      <ul className="space-y-4">
        {restaurants.map((rest) => (
          <li key={rest.restaurant_id} className="border p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                🍽️ <strong>{rest.name}</strong> - {rest.location}
              </div>
              {user?.role === 'restaurant_owner' && user.user_id === rest.owner_id && (
                <div className="space-x-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleEdit(rest.restaurant_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(rest.restaurant_id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
