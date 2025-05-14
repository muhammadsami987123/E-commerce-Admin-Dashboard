"use client";

import { useState } from "react";
import { FiSearch, FiFilter, FiEye } from "react-icons/fi";

// Define interfaces for order data
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Customer {
  name: string;
  email: string;
  id: string;
}

interface Order {
  id: string;
  customer: Customer;
  date: string;
  status: string;
  payment: string;
  total: number;
  items: OrderItem[];
}

// Sample orders data
const initialOrders: Order[] = [
  { 
    id: "ORD-001", 
    customer: { name: "John Smith", email: "john.smith@example.com", id: "CUST-001" },
    date: "2023-05-15",
    status: "Completed",
    payment: "Credit Card",
    total: 129.99,
    items: [
      { id: 1, name: "Professional Laptop", price: 1299.99, quantity: 1 }
    ]
  },
  { 
    id: "ORD-002", 
    customer: { name: "Sarah Johnson", email: "sarah.j@example.com", id: "CUST-002" },
    date: "2023-05-14",
    status: "Processing",
    payment: "PayPal",
    total: 79.99,
    items: [
      { id: 5, name: "Ergonomic Keyboard", price: 129.99, quantity: 1 },
      { id: 7, name: "Wireless Mouse", price: 49.99, quantity: 1 }
    ]
  },
  { 
    id: "ORD-003", 
    customer: { name: "Michael Brown", email: "mbrown@example.com", id: "CUST-003" },
    date: "2023-05-14",
    status: "Pending",
    payment: "Bank Transfer",
    total: 239.99,
    items: [
      { id: 6, name: "Stylish Coffee Table", price: 349.99, quantity: 1 }
    ]
  },
  { 
    id: "ORD-004", 
    customer: { name: "Emily Wilson", email: "emily.w@example.com", id: "CUST-004" },
    date: "2023-05-13",
    status: "Completed",
    payment: "Credit Card",
    total: 59.99,
    items: [
      { id: 8, name: "Modern Desk Lamp", price: 79.99, quantity: 1 }
    ]
  },
  { 
    id: "ORD-005", 
    customer: { name: "David Lee", email: "david.lee@example.com", id: "CUST-005" },
    date: "2023-05-12",
    status: "Shipped",
    payment: "PayPal",
    total: 189.99,
    items: [
      { id: 4, name: "Office Desk Chair", price: 189.99, quantity: 1 }
    ]
  },
  { 
    id: "ORD-006", 
    customer: { name: "Jennifer Taylor", email: "jtaylor@example.com", id: "CUST-006" },
    date: "2023-05-11",
    status: "Completed",
    payment: "Credit Card",
    total: 249.99,
    items: [
      { id: 3, name: "Smart Watch", price: 249.99, quantity: 1 }
    ]
  },
];

export default function OrdersPage() {
  const [orders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsViewingDetails(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Orders</h1>

      {isViewingDetails && selectedOrder ? (
        // Order details view
        <div className="space-y-6">
          <div className="flex justify-between">
            <button 
              onClick={() => setIsViewingDetails(false)} 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Orders
            </button>
            <div className="flex space-x-2">
              <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
                Print Invoice
              </button>
              <button className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                Mark as Shipped
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Order #{selectedOrder.id}</h2>
                  <p className="text-gray-600">Placed on {selectedOrder.date}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                    selectedOrder.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    selectedOrder.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    selectedOrder.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Customer Information</h3>
                <p className="text-gray-800 font-medium">{selectedOrder.customer.name}</p>
                <p className="text-gray-600">{selectedOrder.customer.email}</p>
                <p className="text-gray-600">Customer ID: {selectedOrder.customer.id}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Payment Information</h3>
                <p className="text-gray-800 font-medium">{selectedOrder.payment}</p>
                <p className="text-gray-600">Total: ${selectedOrder.total.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-medium text-gray-700 mb-4">Order Items</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{item.quantity}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2">
                    <td colSpan={3} className="px-4 py-4 text-sm font-medium text-gray-900 text-right">
                      Total:
                    </td>
                    <td className="px-4 py-4 text-base font-bold text-gray-900 text-right">
                      ${selectedOrder.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      ) : (
        // Orders list view
        <>
          {/* Filters and Search */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-400" />
                <select 
                  className="border rounded-lg px-4 py-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <select className="border rounded-lg px-4 py-2">
                <option value="date-desc">Date: Newest First</option>
                <option value="date-asc">Date: Oldest First</option>
                <option value="total-desc">Total: High to Low</option>
                <option value="total-asc">Total: Low to High</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">${order.total.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEye className="inline mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
            
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredOrders.length}</span> of{" "}
                <span className="font-medium">{orders.length}</span> orders
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded text-sm bg-blue-50 border-blue-200">
                  1
                </button>
                <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 