
import React from "react";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "@/data/mockData";
import { Star, Clock } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="restaurant-card cursor-pointer"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-medium px-2 py-1 rounded bg-food-primary">
              {restaurant.cuisine}
            </span>
            <span className="flex items-center text-white">
              <Star className="w-4 h-4 text-yellow-400 mr-1 inline" fill="#FACC15" />
              {restaurant.rating}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{restaurant.name}</h3>
          <span className="text-gray-600 text-sm">{restaurant.priceRange}</span>
        </div>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{restaurant.description}</p>
        
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>{restaurant.deliveryTime}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
