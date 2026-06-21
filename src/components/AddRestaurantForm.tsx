import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  onRestaurantAdded: () => void;
}

const AddRestaurantForm: React.FC<Props> = ({ onRestaurantAdded }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to add a restaurant.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          location,
          owner_id: user.user_id, // make sure AuthContext user type includes user_id
        }),
      });

      if (response.ok) {
        setName('');
        setLocation('');
        onRestaurantAdded();
      } else {
        console.error('Failed to add restaurant');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Add New Restaurant</h2>
      <input
        type="text"
        placeholder="Restaurant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Restaurant
      </button>
    </form>
  );
};

export default AddRestaurantForm;
