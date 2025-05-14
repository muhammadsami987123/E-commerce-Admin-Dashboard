"use client";

import { useState } from "react";
import { FiSearch, FiPhone, FiMail, FiUser, FiShoppingBag } from "react-icons/fi";

// Define customer interface
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  orders: number;
  totalSpent: number;
  address: string;
  lastPurchase: string;
}

// Sample customers data
const initialCustomers: Customer[] = [
  { 
    id: "CUST-001", 
    name: "John Smith", 
    email: "john.smith@example.com",
    phone: "+1 555-1234",
    joinDate: "2023-01-15",
    orders: 12,
    totalSpent: 1549.88,
    address: "123 Main St, New York, NY 10001",
    lastPurchase: "2023-05-10"
  },
  { 
    id: "CUST-002", 
    name: "Sarah Johnson", 
    email: "sarah.j@example.com",
    phone: "+1 555-5678",
    joinDate: "2023-02-22",
    orders: 5,
    totalSpent: 789.45,
    address: "456 Park Ave, Boston, MA 02108",
    lastPurchase: "2023-05-14"
  },
  { 
    id: "CUST-003", 
    name: "Michael Brown", 
    email: "mbrown@example.com",
    phone: "+1 555-9012",
    joinDate: "2023-03-08",
    orders: 8,
    totalSpent: 1245.35,
    address: "789 Oak St, Chicago, IL 60007",
    lastPurchase: "2023-05-14"
  },
  { 
    id: "CUST-004", 
    name: "Emily Wilson", 
    email: "emily.w@example.com",
    phone: "+1 555-3456",
    joinDate: "2023-01-30",
    orders: 3,
    totalSpent: 349.97,
    address: "321 Maple Rd, Seattle, WA 98101",
    lastPurchase: "2023-05-13"
  },
  { 
    id: "CUST-005", 
    name: "David Lee", 
    email: "david.lee@example.com",
    phone: "+1 555-7890",
    joinDate: "2023-04-11",
    orders: 1,
    totalSpent: 189.99,
    address: "567 Pine St, San Francisco, CA 94101",
    lastPurchase: "2023-05-12"
  },
  { 
    id: "CUST-006", 
    name: "Jennifer Taylor", 
    email: "jtaylor@example.com",
    phone: "+1 555-2345",
    joinDate: "2023-02-14",
    orders: 7,
    totalSpent: 879.93,
    address: "890 Cedar Ave, Miami, FL 33101",
    lastPurchase: "2023-05-11"
  },
];

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewingDetails(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
      
      {isViewingDetails && selectedCustomer ? (
        // Customer details view
        <div className="space-y-6">
          <div className="flex justify-between">
            <button 
              onClick={() => setIsViewingDetails(false)} 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Customers
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedCustomer.name}</h2>
                    <p className="text-gray-600">{selectedCustomer.id}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                  <div className="flex items-center gap-2 mb-1">
                    <FiMail className="text-gray-400" />
                    <span className="text-gray-700">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-gray-400" />
                    <span className="text-gray-700">{selectedCustomer.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <FiUser className="text-blue-500" />
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-800">{selectedCustomer.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer Since</p>
                    <p className="text-gray-800">{selectedCustomer.joinDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <FiShoppingBag className="text-green-500" />
                  Purchase Information
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-xl font-semibold text-gray-800">{selectedCustomer.orders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Spent</p>
                      <p className="text-xl font-semibold text-gray-800">${selectedCustomer.totalSpent.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Purchase</p>
                    <p className="text-gray-800">{selectedCustomer.lastPurchase}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t">
              <h3 className="font-medium text-gray-700 mb-4">Recent Orders</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                Detailed order history will be displayed here.
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Customers list view
        <>
          {/* Search */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select className="border rounded-lg px-4 py-2">
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="orders">Orders</option>
                <option value="spent">Total Spent</option>
                <option value="recent">Recent Customers</option>
              </select>
            </div>
          </div>

          {/* Customers Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map(customer => (
              <div 
                key={customer.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleViewCustomer(customer)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{customer.name}</h3>
                        <p className="text-sm text-gray-500">{customer.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Customer Since</p>
                      <p className="text-sm font-medium">{customer.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Orders</p>
                      <p className="font-semibold text-gray-900">{customer.orders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Spent</p>
                      <p className="font-semibold text-gray-900">${customer.totalSpent.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <FiMail className="text-gray-400" />
                      <span className="text-gray-600 truncate max-w-[180px]">{customer.email}</span>
                    </div>
                    <span className="text-blue-600 font-medium">View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No customers found</p>
            </div>
          )}
          
          <div className="bg-white px-6 py-3 rounded-lg shadow-sm flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredCustomers.length}</span> of{" "}
              <span className="font-medium">{customers.length}</span> customers
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
        </>
      )}
    </div>
  );
} 