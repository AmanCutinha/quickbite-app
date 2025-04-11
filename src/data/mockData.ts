
import { MenuItem } from "../contexts/CartContext";

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string;
  deliveryTime: string;
  rating: number;
  priceRange: string;
  address: string;
}

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Tasty Burgers",
    description: "Delicious homemade burgers with fresh ingredients",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cuisine: "American",
    deliveryTime: "20-30 min",
    rating: 4.7,
    priceRange: "$$",
    address: "123 Burger St, Foodville"
  },
  {
    id: "r2",
    name: "Pizza Palace",
    description: "Authentic Italian pizzas with a variety of toppings",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cuisine: "Italian",
    deliveryTime: "30-40 min",
    rating: 4.5,
    priceRange: "$$",
    address: "456 Pizza Lane, Foodville"
  },
  {
    id: "r3",
    name: "Sushi Spot",
    description: "Fresh sushi made daily by experienced chefs",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cuisine: "Japanese",
    deliveryTime: "25-35 min",
    rating: 4.8,
    priceRange: "$$$",
    address: "789 Sushi Ave, Foodville"
  },
  {
    id: "r4",
    name: "Taco Town",
    description: "Authentic Mexican tacos and burritos",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cuisine: "Mexican",
    deliveryTime: "15-25 min",
    rating: 4.6,
    priceRange: "$",
    address: "321 Taco Rd, Foodville"
  },
  {
    id: "r5",
    name: "Curry House",
    description: "Flavorful Indian curries and kebabs",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cuisine: "Indian",
    deliveryTime: "35-45 min",
    rating: 4.4,
    priceRange: "$$",
    address: "567 Curry St, Foodville"
  },
  {
    id: "r6",
    name: "Noodle Bar",
    description: "Variety of Asian noodles and dumplings",
    image: "https://images.unsplash.com/photo-1503392968123-cebbe9f26526?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cuisine: "Asian",
    deliveryTime: "20-30 min",
    rating: 4.3,
    priceRange: "$$",
    address: "890 Noodle Blvd, Foodville"
  }
];

export const menuItems: { [key: string]: MenuItem[] } = {
  "r1": [
    {
      id: "m1",
      name: "Classic Cheeseburger",
      description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r1",
      category: "Burgers",
      available: true
    },
    {
      id: "m2",
      name: "Bacon Burger",
      description: "Beef patty with crispy bacon, cheddar cheese, lettuce, and BBQ sauce",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r1",
      category: "Burgers",
      available: true
    },
    {
      id: "m3",
      name: "Veggie Burger",
      description: "Plant-based patty with lettuce, tomato, and vegan mayo",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r1",
      category: "Burgers",
      available: true
    },
    {
      id: "m4",
      name: "French Fries",
      description: "Crispy golden fries with sea salt",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r1",
      category: "Sides",
      available: true
    },
    {
      id: "m5",
      name: "Onion Rings",
      description: "Crispy battered onion rings",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r1",
      category: "Sides",
      available: true
    },
    {
      id: "m6",
      name: "Chocolate Milkshake",
      description: "Thick chocolate milkshake with whipped cream",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1594488506255-a8bbadefc88e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r1",
      category: "Drinks",
      available: true
    }
  ],
  "r2": [
    {
      id: "m7",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r2",
      category: "Pizzas",
      available: true
    },
    {
      id: "m8",
      name: "Pepperoni Pizza",
      description: "Pizza with tomato sauce, mozzarella, and pepperoni",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r2",
      category: "Pizzas",
      available: true
    },
    {
      id: "m9",
      name: "Vegetarian Pizza",
      description: "Pizza with tomato sauce, mozzarella, bell peppers, mushrooms, and olives",
      price: 13.99,
      image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r2",
      category: "Pizzas",
      available: true
    },
    {
      id: "m10",
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r2",
      category: "Sides",
      available: true
    },
    {
      id: "m11",
      name: "Caesar Salad",
      description: "Romaine lettuce with Caesar dressing, croutons, and parmesan",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r2",
      category: "Salads",
      available: true
    },
    {
      id: "m12",
      name: "Soda",
      description: "Your choice of soft drink",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r2",
      category: "Drinks",
      available: true
    }
  ],
  "r3": [
    {
      id: "m13",
      name: "California Roll",
      description: "Crab, avocado, and cucumber roll",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r3",
      category: "Rolls",
      available: true
    },
    {
      id: "m14",
      name: "Spicy Tuna Roll",
      description: "Roll with spicy tuna and cucumber",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1676037150408-4b59a542f691?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r3",
      category: "Rolls",
      available: true
    }
  ],
  "r4": [
    {
      id: "m20",
      name: "Beef Taco",
      description: "Corn tortilla with seasoned beef, lettuce, cheese, and salsa",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r4",
      category: "Tacos",
      available: true
    }
  ],
  "r5": [
    {
      id: "m26",
      name: "Chicken Tikka Masala",
      description: "Grilled chicken in a creamy tomato sauce",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r5",
      category: "Curries",
      available: true
    }
  ],
  "r6": [
    {
      id: "m32",
      name: "Pad Thai",
      description: "Stir-fried rice noodles with tofu, peanuts, and bean sprouts",
      price: 13.99,
      image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantId: "r6",
      category: "Noodles",
      available: true
    }
  ]
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getMenuByRestaurantId = (restaurantId: string): MenuItem[] => {
  return menuItems[restaurantId] || [];
};
