
import React, { createContext, useContext, useState, useEffect } from "react";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
  category: string;
  available: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  restaurantId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem("foodCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart.items || []);
        setRestaurantId(parsedCart.restaurantId || null);
      } catch (error) {
        console.error("Error parsing saved cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("foodCart", JSON.stringify({
      items: cart,
      restaurantId: restaurantId
    }));
  }, [cart, restaurantId]);

  const addToCart = (item: MenuItem) => {
    // Check if item is from the same restaurant
    if (cart.length > 0 && restaurantId !== null && item.restaurantId !== restaurantId) {
      // Show confirmation to clear cart
      if (window.confirm("Adding items from a different restaurant will clear your current cart. Continue?")) {
        setCart([{ menuItem: item, quantity: 1 }]);
        setRestaurantId(item.restaurantId);
      }
      return;
    }

    // First item sets the restaurant
    if (cart.length === 0) {
      setRestaurantId(item.restaurantId);
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.menuItem.id === item.id
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item
      setCart([...cart, { menuItem: item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.menuItem.id !== itemId);
    setCart(updatedCart);
    
    // Reset restaurant if cart is empty
    if (updatedCart.length === 0) {
      setRestaurantId(null);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.menuItem.id === itemId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    setRestaurantId(null);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        restaurantId
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
