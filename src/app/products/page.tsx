"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";

// Define product interface
interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}

// Sample product data
const initialProducts: Product[] = [
  { id: 1, name: "Professional Laptop", sku: "TECH-001", category: "Electronics", price: 1299.99, stock: 45 },
  { id: 2, name: "Wireless Headphones", sku: "TECH-002", category: "Electronics", price: 159.99, stock: 78 },
  { id: 3, name: "Smart Watch", sku: "TECH-003", category: "Electronics", price: 249.99, stock: 32 },
  { id: 4, name: "Office Desk Chair", sku: "FURN-001", category: "Furniture", price: 189.99, stock: 15 },
  { id: 5, name: "Ergonomic Keyboard", sku: "TECH-004", category: "Electronics", price: 129.99, stock: 53 },
  { id: 6, name: "Stylish Coffee Table", sku: "FURN-002", category: "Furniture", price: 349.99, stock: 8 },
  { id: 7, name: "Wireless Mouse", sku: "TECH-005", category: "Electronics", price: 49.99, stock: 92 },
  { id: 8, name: "Modern Desk Lamp", sku: "HOME-001", category: "Home Decor", price: 79.99, stock: 27 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0
  });

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Start editing a product
  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setEditFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock
    });
  };

  // Handle form field changes
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value
    });
  };

  // Save the edited product
  const handleSaveClick = (id: number) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        return { ...product, ...editFormData };
      }
      return product;
    });
    setProducts(updatedProducts);
    setEditingId(null);
  };

  // Cancel editing
  const handleCancelClick = () => {
    setEditingId(null);
  };

  // Delete a product
  const handleDeleteClick = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <Link
          href="/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add New Product
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="border rounded-lg px-4 py-2">
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Home Decor">Home Decor</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="stock-desc">Stock: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  {editingId === product.id ? (
                    // Edit mode
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditFormChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="category"
                          value={editFormData.category}
                          onChange={handleEditFormChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          name="price"
                          value={editFormData.price}
                          onChange={handleEditFormChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          name="stock"
                          value={editFormData.stock}
                          onChange={handleEditFormChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                        <button
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handleSaveClick(product.id)}
                        >
                          <FiSave className="inline mr-1" />
                          Save
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          onClick={handleCancelClick}
                        >
                          <FiX className="inline mr-1" />
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    // View mode
                    <>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 30 ? 'bg-green-100 text-green-800' :
                          product.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => handleEditClick(product)}
                        >
                          <FiEdit2 className="inline mr-1" />
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          <FiTrash2 className="inline mr-1" />
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
        
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredProducts.length}</span> of{" "}
            <span className="font-medium">{products.length}</span> products
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
    </div>
  );
} 