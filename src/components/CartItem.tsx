
import React from "react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import { Trash, Plus, Minus } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { menuItem, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncreaseQuantity = () => {
    updateQuantity(menuItem.id, quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(menuItem.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(menuItem.id);
  };
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-16 h-16 mr-4">
        <img 
          src={menuItem.image} 
          alt={menuItem.name} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium">{menuItem.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{menuItem.description}</p>
        <p className="text-food-primary font-medium mt-1">${menuItem.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center ml-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="w-8 h-8 rounded-full"
          onClick={handleDecreaseQuantity}
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <span className="mx-3 w-6 text-center">{quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="w-8 h-8 rounded-full"
          onClick={handleIncreaseQuantity}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="ml-4 text-right">
        <p className="font-semibold">${(menuItem.price * quantity).toFixed(2)}</p>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-red-500 mt-1"
          onClick={handleRemove}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
