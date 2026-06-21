import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AddRestaurantForm from '@/components/AddRestaurantForm';

type Restaurant = {
  restaurant_id: number;
  name: string;
  location: string;
  owner_id: number;
};

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch('http://localhost:5000/restaurants');
      const data = await res.json();
      // Only show restaurants owned by the logged-in owner
      const filtered = data.filter((r: Restaurant) => r.owner_id === user?.user_id);
      setRestaurants(filtered);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
    }
  };

  useEffect(() => {
    if (user?.role === 'restaurant_owner') {
      fetchRestaurants();
    }
  }, [user]);

  const handleDelete = async (restaurantId: number) => {
    try {
      await fetch(`http://localhost:5000/restaurants/${restaurantId}`, {
        method: 'DELETE',
      });
      fetchRestaurants(); // Refresh list
    } catch (err) {
      console.error('Error deleting restaurant:', err);
    }
  };

  const handleEdit = (id: number) => {
    alert(`You can implement editing UI for restaurant ID: ${id}`);
    // You can add a modal/form here to edit
  };

  if (user?.role !== 'restaurant_owner') {
    return <p className="text-center mt-8 text-red-500">Access Denied. Only restaurant owners can access this page.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Restaurants</h1>

      <AddRestaurantForm onRestaurantAdded={fetchRestaurants} />

      <ul className="space-y-4">
        {restaurants.map((rest) => (
          <li key={rest.restaurant_id} className="p-4 bg-white shadow rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{rest.name}</h3>
                <p className="text-sm text-gray-600">{rest.location}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(rest.restaurant_id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rest.restaurant_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerDashboard;
