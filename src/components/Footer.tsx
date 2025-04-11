
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="food-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">QuickBite</h3>
            <p className="text-gray-600 text-sm">
              The fastest way to get your favorite food delivered to your doorstep.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-food-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-gray-600 hover:text-food-primary">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-food-primary">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-600 hover:text-food-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-food-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">Email: support@quickbite.com</li>
              <li className="text-gray-600">Phone: +1 234 567 890</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} QuickBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
