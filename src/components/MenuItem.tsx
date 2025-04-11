
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuItem as MenuItemType } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import { PlusCircle, MinusCircle } from "lucide-react";
import { toast } from "../hooks/use-toast";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    toast({
      title: "Added to cart",
      description: `${quantity} x ${item.name} added to your cart`,
    });
    setQuantity(1);
  };
  
  if (!item.available) {
    return (
      <div className="menu-item-card opacity-60">
        <div className="flex items-start">
          <div className="flex-grow">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
            <p className="mt-2 font-semibold">${item.price.toFixed(2)}</p>
          </div>
          
          {item.image && (
            <div className="w-24 h-24 ml-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
            Currently unavailable
          </span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="menu-item-card">
      <div className="flex items-start">
        <div className="flex-grow">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
          <p className="mt-2 font-semibold">${item.price.toFixed(2)}</p>
        </div>
        
        {item.image && (
          <div className="w-24 h-24 ml-4">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-8 h-8 rounded-full"
            onClick={decreaseQuantity}
          >
            <MinusCircle className="w-5 h-5" />
          </Button>
          
          <span className="mx-3 w-6 text-center">{quantity}</span>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="w-8 h-8 rounded-full"
            onClick={increaseQuantity}
          >
            <PlusCircle className="w-5 h-5" />
          </Button>
        </div>
        
        <Button 
          variant="default"
          size="sm"
          className="bg-food-primary hover:bg-amber-500 text-white"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;
