import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Restaurant {
  restaurant_id: number;
  name: string;
  location: string;
  owner_id: number;
}

const ManageRestaurants: React.FC = () => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch('http://localhost:5000/restaurants');
      const data = await res.json();
      const owned = data.filter((r: Restaurant) => r.owner_id === user?.user_id);
      setRestaurants(owned);
    } catch (err) {
      console.error('Fetch error', err);
    }
  };

  useEffect(() => {
    if (user) fetchRestaurants();
  }, [user]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await fetch('http://localhost:5000/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, owner_id: user.user_id }),
      });
      if (res.ok) {
        setName('');
        setLocation('');
        fetchRestaurants();
      }
    } catch (err) {
      console.error('Add error', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/restaurants/${id}`, {
        method: 'DELETE',
      });
      fetchRestaurants();
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingId(restaurant.restaurant_id);
    setName(restaurant.name);
    setLocation(restaurant.location);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !user) return;

    try {
      await fetch(`http://localhost:5000/restaurants/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          location,
          owner_id: user.user_id,
        }),
      });
      setEditingId(null);
      setName('');
      setLocation('');
      fetchRestaurants();
    } catch (err) {
      console.error('Update error', err);
    }
  };

  if (!user || user.role !== 'restaurant_owner') {
    return <p className="p-4">Access denied. Only restaurant owners can manage restaurants.</p>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Manage Restaurants</h1>

      <form onSubmit={editingId ? handleUpdate : handleAdd} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Restaurant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Update' : 'Add'} Restaurant
        </button>
      </form>

      <ul>
        {restaurants.map((r) => (
          <li key={r.restaurant_id} className="border p-2 mb-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-gray-600">{r.location}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(r)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r.restaurant_id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRestaurants;
