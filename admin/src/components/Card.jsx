// admin/src/components/Card.jsx
import React from "react";
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

export const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
    {icon}
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export const QuickActionCard = ({ title, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow">
    {icon}
    <h3 className="mt-2 text-blue-600 font-semibold">{title}</h3>
  </div>
);

export const RecentOrders = () => {
  const orders = [
    {
      id: "#1023 - John Doe",
      customer: "John Doe",
      amount: "$250.00",
      status: "Pending",
      color: "bg-yellow-500",
    },
    {
      id: "#1022 - Jane Smith",
      customer: "Jane Smith",
      amount: "$180.00",
      status: "Shipped",
      color: "bg-green-500",
    },
    {
      id: "#1021 - Michael Brown",
      customer: "Michael Brown",
      amount: "$320.00",
      status: "Processing",
      color: "bg-blue-500",
    },
    {
      id: "#1020 - Sarah Wilson",
      customer: "Sarah Wilson",
      amount: "$150.00",
      status: "Completed",
      color: "bg-gray-500",
    },
    {
      id: "#1019 - David Lee",
      customer: "David Lee",
      amount: "$95.00",
      status: "Pending",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <div className="text-gray-400">•••</div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="pb-2">Order ID</th>
            <th className="pb-2">Customer</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-2 text-blue-600">{order.id}</td>
              <td className="py-2">{order.customer}</td>
              <td className="py-2">{order.amount}</td>
              <td className="py-2">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${order.color}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
