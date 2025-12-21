// Example: Dashboard.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { StatCard, QuickActionCard, RecentOrders } from "../components/Card";
import {
  Box,
  ShoppingCart,
  User,
  DollarSign,
  Tag,
  ClipboardList,
  Users as UsersIcon,
  Settings,
} from "lucide-react";

const Dashboard = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Products"
        value="28"
        icon={<Box className="text-blue-600 w-8 h-8" />}
      />
      <StatCard
        title="Orders Today"
        value="5"
        icon={<ShoppingCart className="text-blue-600 w-8 h-8" />}
      />
      <StatCard
        title="Total Users"
        value="1,210"
        icon={<User className="text-blue-600 w-8 h-8" />}
      />
      <StatCard
        title="Total Revenue"
        value="$4,560"
        icon={<DollarSign className="text-blue-600 w-8 h-8" />}
      />
    </div>

    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <QuickActionCard
        title="Manage Products"
        icon={<Tag className="text-blue-600 w-12 h-12" />}
      />
      <QuickActionCard
        title="View Orders"
        icon={<ClipboardList className="text-blue-600 w-12 h-12" />}
      />
      <QuickActionCard
        title="View Users"
        icon={<UsersIcon className="text-blue-600 w-12 h-12" />}
      />
      <QuickActionCard
        title="Store Settings"
        icon={<Settings className="text-blue-600 w-12 h-12" />}
      />
    </div>

    <RecentOrders />
  </>
);

export default Dashboard;
