"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiBox, FiShoppingCart, FiUsers, FiBarChart2, FiTrendingUp } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
];

const recentOrders = [
  { id: "#ORD-001", customer: "John Smith", date: "2023-05-15", status: "Completed", amount: "$129.99" },
  { id: "#ORD-002", customer: "Sarah Johnson", date: "2023-05-14", status: "Processing", amount: "$79.99" },
  { id: "#ORD-003", customer: "Michael Brown", date: "2023-05-14", status: "Pending", amount: "$239.99" },
  { id: "#ORD-004", customer: "Emily Wilson", date: "2023-05-13", status: "Completed", amount: "$59.99" },
];

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value="254" 
          change="+12%" 
          icon={<FiBox className="text-blue-500" />} 
        />
        <StatCard 
          title="Total Orders" 
          value="1,254" 
          change="+23%" 
          icon={<FiShoppingCart className="text-green-500" />} 
        />
        <StatCard 
          title="Total Customers" 
          value="3,845" 
          change="+15%" 
          icon={<FiUsers className="text-purple-500" />} 
        />
        <StatCard 
          title="Total Revenue" 
          value="$12,345" 
          change="+18%" 
          icon={<FiBarChart2 className="text-yellow-500" />} 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Monthly Sales</h2>
            <select className="text-sm border rounded px-2 py-1">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72">
            {isClient && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
            <Link href="/orders" className="text-blue-600 text-sm hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{order.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link 
            href="/products/new" 
            className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex items-center gap-3 transition-colors"
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <FiBox className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Add New Product</h3>
              <p className="text-sm text-gray-500">Register a new product</p>
            </div>
          </Link>
          <Link 
            href="/orders" 
            className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex items-center gap-3 transition-colors"
          >
            <div className="bg-green-100 p-2 rounded-lg">
              <FiShoppingCart className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Manage Orders</h3>
              <p className="text-sm text-gray-500">View and process orders</p>
            </div>
          </Link>
          <Link 
            href="/customers" 
            className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex items-center gap-3 transition-colors"
          >
            <div className="bg-purple-100 p-2 rounded-lg">
              <FiUsers className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Manage Customers</h3>
              <p className="text-sm text-gray-500">View customer details</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Add proper type definitions for the StatCard component
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
        </div>
        <div className="p-2 rounded-lg bg-gray-50">{icon}</div>
      </div>
      <div className="flex items-center mt-4">
        <FiTrendingUp className="text-green-500 mr-1" />
        <p className="text-sm text-green-600 font-medium">{change} <span className="text-gray-500">vs last month</span></p>
      </div>
    </div>
  );
}
