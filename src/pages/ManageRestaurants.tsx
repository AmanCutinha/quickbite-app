import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Restaurant {
  restaurant_id: number;
  name: string;
  description: string;
  cuisine: string;
  address: string;
  city: string;
  delivery_time: string;
  price_range: string;
  hero_image: string;
  banner_image: string;
  featured: boolean;
  owner_id: number;
}

const ManageRestaurants: React.FC = () => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Foodville');
  const [deliveryTime, setDeliveryTime] = useState('20-30 min');
  const [priceRange, setPriceRange] = useState('$$');
  const [heroImage, setHeroImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  
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

  const resetForm = () => {
    setName('');
    setDescription('');
    setCuisine('');
    setAddress('');
    setCity('Foodville');
    setDeliveryTime('20-30 min');
    setPriceRange('$$');
    setHeroImage('');
    setBannerImage('');
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await fetch('http://localhost:5000/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          cuisine,
          address,
          city,
          delivery_time: deliveryTime,
          price_range: priceRange,
          hero_image: heroImage,
          banner_image: bannerImage,
          owner_id: user.user_id,
        }),
      });
      if (res.ok) {
        resetForm();
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
    setDescription(restaurant.description || '');
    setCuisine(restaurant.cuisine || '');
    setAddress(restaurant.address || '');
    setCity(restaurant.city || 'Foodville');
    setDeliveryTime(restaurant.delivery_time || '20-30 min');
    setPriceRange(restaurant.price_range || '$$');
    setHeroImage(restaurant.hero_image || '');
    setBannerImage(restaurant.banner_image || '');
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
          description,
          cuisine,
          address,
          city,
          delivery_time: deliveryTime,
          price_range: priceRange,
          hero_image: heroImage,
          banner_image: bannerImage,
          owner_id: user.user_id,
        }),
      });
      setEditingId(null);
      resetForm();
      fetchRestaurants();
    } catch (err) {
      console.error('Update error', err);
    }
  };

  if (!user || (user.role !== 'restaurant_owner' && user.role !== 'admin')) {
    return <p className="p-4">Access denied. Only restaurant owners and administrators can manage restaurants.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Manage Restaurants</h1>

      <form onSubmit={editingId ? handleUpdate : handleAdd} className="mb-8 space-y-4 bg-white p-6 border rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">{editingId ? 'Edit' : 'Add New'} Restaurant</h2>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Restaurant Name</label>
          <input
            type="text"
            placeholder="e.g. Tasty Burgers"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
          <textarea
            placeholder="Describe the restaurant..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded min-h-[80px]"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Cuisine Type</label>
            <input
              type="text"
              placeholder="e.g. American, Italian"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Price Range</label>
            <input
              type="text"
              placeholder="e.g. $, $$, $$$"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Delivery Time</label>
            <input
              type="text"
              placeholder="e.g. 20-30 min"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">City</label>
            <input
              type="text"
              placeholder="e.g. Foodville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Street Address</label>
          <input
            type="text"
            placeholder="e.g. 123 Burger St"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Hero Image URL</label>
          <input
            type="text"
            placeholder="https://..."
            value={heroImage}
            onChange={(e) => setHeroImage(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Banner Image URL</label>
          <input
            type="text"
            placeholder="https://..."
            value={bannerImage}
            onChange={(e) => setBannerImage(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium flex-1"
          >
            {editingId ? 'Update' : 'Add'} Restaurant
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); resetForm(); }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-4">
        {restaurants.map((r) => (
          <li key={r.restaurant_id} className="border p-4 bg-white rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg text-gray-800">{r.name}</p>
              <p className="text-sm text-gray-500">{r.address}, {r.city} • {r.cuisine}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(r)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r.restaurant_id)}
                className="text-red-600 hover:text-red-800 font-medium text-sm"
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
