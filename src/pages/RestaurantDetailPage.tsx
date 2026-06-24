import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, MapPin } from "lucide-react";
import MenuItem from "@/components/MenuItem";
import { MenuItem as MenuItemType } from "@/contexts/CartContext";

interface RestaurantDetail {
  restaurant_id: number;
  name: string;
  description: string;
  cuisine: string;
  address: string;
  city: string;
  rating: number;
  review_count: number;
  delivery_time: string;
  price_range: string;
  hero_image: string;
  banner_image: string;
}

interface DbMenuItem {
  item_id: number;
  name: string;
  description: string;
  price: string;
  availability: boolean;
  image_url: string;
  category_name: string;
}

const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null);
  const [menu, setMenu] = useState<MenuItemType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([
        fetch(`http://localhost:5000/restaurants/${id}`).then((res) => {
          if (!res.ok) throw new Error("Restaurant not found");
          return res.json();
        }),
        fetch(`http://localhost:5000/restaurants/${id}/menu`).then((res) => res.json())
      ])
        .then(([restaurantData, menuData]) => {
          setRestaurant(restaurantData);

          // Map database structure to Cart MenuItemType format
          const mappedMenu: MenuItemType[] = menuData.map((item: DbMenuItem) => ({
            id: item.item_id.toString(),
            name: item.name,
            description: item.description || "",
            price: parseFloat(item.price),
            image: item.image_url || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1",
            restaurantId: id,
            category: item.category_name || "General",
            available: item.availability
          }));

          setMenu(mappedMenu);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(mappedMenu.map((item) => item.category))
          );
          setCategories(uniqueCategories);
        })
        .catch((err) => {
          console.error("Error loading restaurant details:", err);
          setRestaurant(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="food-container py-16 text-center">
        <p className="text-gray-500">Loading details...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="food-container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
        <p className="text-gray-600">
          The restaurant you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <img 
          src={restaurant.banner_image || restaurant.hero_image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1'} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="food-container text-white pb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {restaurant.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <span className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" fill="#FACC15" />
                {Number(restaurant.rating).toFixed(1)} ({restaurant.review_count || Math.floor(restaurant.rating * 10)} reviews)
              </span>
              
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {restaurant.delivery_time}
              </span>
              
              <span>{restaurant.cuisine}</span>
              
              <span>{restaurant.price_range}</span>
            </div>
            
            <div className="flex items-center mt-2 text-gray-200">
              <MapPin className="w-4 h-4 mr-1" />
              {restaurant.address}
            </div>
          </div>
        </div>
      </div>
      
      {/* Restaurant Content */}
      <div className="food-container py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">About {restaurant.name}</h2>
          <p className="text-gray-700">{restaurant.description}</p>
        </div>
        
        {/* Menu */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          
          {categories.length > 0 ? (
            <Tabs defaultValue={categories[0]}>
              <TabsList className="mb-6">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menu
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <MenuItem key={item.id} item={item} />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No menu items available for this restaurant.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
