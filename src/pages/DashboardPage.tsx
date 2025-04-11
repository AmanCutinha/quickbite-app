
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { MenuItem } from "@/contexts/CartContext";
import { getMenuByRestaurantId } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash, Clock } from "lucide-react";

// Mock orders
const mockOrders = [
  {
    id: "o1",
    customerName: "John Doe",
    items: [
      { name: "Classic Cheeseburger", quantity: 2, price: 9.99 },
      { name: "French Fries", quantity: 1, price: 4.99 },
    ],
    total: 24.97,
    status: "pending",
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
  },
  {
    id: "o2",
    customerName: "Jane Smith",
    items: [
      { name: "Veggie Burger", quantity: 1, price: 10.99 },
      { name: "Onion Rings", quantity: 1, price: 5.99 },
      { name: "Chocolate Milkshake", quantity: 1, price: 6.99 },
    ],
    total: 23.97,
    status: "completed",
    createdAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(), // 2 hours ago
  },
  {
    id: "o3",
    customerName: "Mike Johnson",
    items: [
      { name: "Bacon Burger", quantity: 1, price: 11.99 },
      { name: "French Fries", quantity: 1, price: 4.99 },
    ],
    total: 16.98,
    status: "preparing",
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
  },
];

// Initial menu item form state
const initialMenuItemForm = {
  id: "",
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  available: true,
  restaurantId: "r1", // Default to first restaurant
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState(mockOrders);
  const [menuItemForm, setMenuItemForm] = useState(initialMenuItemForm);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Check if user is authenticated and is a restaurant owner
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (user?.role !== "restaurant_owner") {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "Only restaurant owners can access the dashboard.",
        variant: "destructive",
      });
      return;
    }
    
    // Load menu items for this restaurant owner
    // In a real app, this would be filtered by the user's restaurant
    setMenuItems(getMenuByRestaurantId("r1"));
  }, [isAuthenticated, user, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setMenuItemForm({
      ...menuItemForm,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };
  
  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuItemForm({
      ...menuItemForm,
      available: e.target.checked,
    });
  };
  
  const handleAddOrUpdateMenuItem = () => {
    if (isEditMode) {
      // Update existing item
      setMenuItems(menuItems.map(item => 
        item.id === menuItemForm.id ? menuItemForm : item
      ));
      toast({
        title: "Menu item updated",
        description: `${menuItemForm.name} has been updated.`,
      });
    } else {
      // Add new item
      const newItem = {
        ...menuItemForm,
        id: `m${Date.now()}`, // Generate a unique ID
      };
      setMenuItems([...menuItems, newItem]);
      toast({
        title: "Menu item added",
        description: `${newItem.name} has been added to your menu.`,
      });
    }
    
    // Reset form and close dialog
    setMenuItemForm(initialMenuItemForm);
    setIsEditMode(false);
    setDialogOpen(false);
  };
  
  const handleEditMenuItem = (item: MenuItem) => {
    setMenuItemForm(item);
    setIsEditMode(true);
    setDialogOpen(true);
  };
  
  const handleDeleteMenuItem = (id: string) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
      toast({
        title: "Menu item deleted",
        description: "The menu item has been removed from your menu.",
      });
    }
  };
  
  const updateOrderStatus = (id: string, status: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
    toast({
      title: "Order status updated",
      description: `Order #${id} has been marked as ${status}.`,
    });
  };
  
  // Format timestamp to relative time (e.g., "30 minutes ago")
  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }
  };
  
  return (
    <div className="py-8 animate-fade-in">
      <div className="food-container">
        <h1 className="text-3xl font-bold mb-8">Restaurant Dashboard</h1>
        
        <Tabs defaultValue="menu">
          <TabsList className="mb-8">
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Menu Items</h2>
                
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => {
                        setMenuItemForm(initialMenuItemForm);
                        setIsEditMode(false);
                      }}
                      className="bg-food-primary hover:bg-amber-500"
                    >
                      <Plus className="mr-2 w-4 h-4" />
                      Add Menu Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {isEditMode ? "Edit Menu Item" : "Add Menu Item"}
                      </DialogTitle>
                      <DialogDescription>
                        {isEditMode 
                          ? "Update the details of this menu item." 
                          : "Add a new item to your restaurant menu."}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Item Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="e.g., Classic Burger"
                          value={menuItemForm.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe your menu item..."
                          value={menuItemForm.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="9.99"
                            value={menuItemForm.price}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            name="category"
                            placeholder="e.g., Burgers"
                            value={menuItemForm.category}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                          id="image"
                          name="image"
                          placeholder="https://example.com/image.jpg"
                          value={menuItemForm.image}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="available"
                          name="available"
                          checked={menuItemForm.available}
                          onChange={handleAvailabilityChange}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="available">Item is available</Label>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        variant="ghost" 
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddOrUpdateMenuItem}
                        className="bg-food-primary hover:bg-amber-500"
                      >
                        {isEditMode ? "Update Item" : "Add Item"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {menuItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    You haven't added any menu items yet.
                  </p>
                  <Button 
                    onClick={() => setDialogOpen(true)}
                    className="bg-food-primary hover:bg-amber-500"
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Add Your First Item
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {menuItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-500 line-clamp-1">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ${item.price.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              item.available 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {item.available ? "Available" : "Unavailable"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800 mr-2"
                              onClick={() => handleEditMenuItem(item)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteMenuItem(item.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    No orders received yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold">
                              Order #{order.id}
                            </h3>
                            <span className="ml-4">
                              <StatusBadge status={order.status} />
                            </span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatRelativeTime(order.createdAt)}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-gray-600">Customer:</p>
                          <p className="font-medium">{order.customerName}</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-b border-gray-100 py-4 my-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-gray-500">
                              <th className="pb-2">Item</th>
                              <th className="pb-2">Qty</th>
                              <th className="pb-2 text-right">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, index) => (
                              <tr key={index}>
                                <td className="py-2">{item.name}</td>
                                <td className="py-2">{item.quantity}</td>
                                <td className="py-2 text-right">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="font-semibold">
                              <td className="pt-4" colSpan={2}>Total</td>
                              <td className="pt-4 text-right">${order.total.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        {order.status === "pending" && (
                          <>
                            <Button 
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => updateOrderStatus(order.id, "cancelled")}
                            >
                              Cancel Order
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              onClick={() => updateOrderStatus(order.id, "preparing")}
                            >
                              Start Preparing
                            </Button>
                          </>
                        )}
                        
                        {order.status === "preparing" && (
                          <Button 
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => updateOrderStatus(order.id, "completed")}
                          >
                            Mark as Completed
                          </Button>
                        )}
                        
                        {(order.status === "completed" || order.status === "cancelled") && (
                          <span className="text-sm text-gray-500 italic">
                            No actions available
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
