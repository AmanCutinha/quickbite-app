import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Store, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
      <div className="food-container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Access Denied</h2>
        <p className="text-gray-600">
          Only administrators can access this control panel.
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center space-x-3 mb-8">
          <Shield className="w-8 h-8 text-food-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
        </div>

        <p className="text-gray-600 mb-8">
          Welcome back, <span className="font-semibold text-gray-800">{user.name}</span>. Select a management panel below to manage the platform settings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manage Users Card */}
          <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition animate-slide-up">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-900">Manage Users</h2>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Add new users, edit existing accounts, assign user roles (Customer, Restaurant Owner, Admin), and delete user profiles.
            </p>
            <Button
              onClick={() => navigate("/users")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Go to User Settings
            </Button>
          </div>

          {/* Manage Restaurants Card */}
          <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition animate-slide-up">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
              <Store className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-900">Manage Restaurants</h2>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Register new dining locations on the platform, update details, assign restaurant owners, and delete listings.
            </p>
            <Button
              onClick={() => navigate("/manage-restaurants")}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Go to Restaurant Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
