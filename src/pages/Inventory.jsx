import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  AlertTriangle,
  BarChart2,
  Package,
  RefreshCw,
  ChevronDown,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';

// Mock data for demonstration
const mockInventoryItems = [
  { id: 1, name: "Nitrogen Fertilizer", category: "Fertilizer", quantity: 2500, unit: "kg", status: "In Stock", location: "Storage A", reorderLevel: 500, lastUpdated: "2023-09-10" },
  { id: 2, name: "Herbicide XL", category: "Pesticide", quantity: 120, unit: "L", status: "Low Stock", location: "Storage B", reorderLevel: 100, lastUpdated: "2023-09-08" },
  { id: 3, name: "Corn Seeds (Hybrid 1)", category: "Seeds", quantity: 50, unit: "bags", status: "In Stock", location: "Storage A", reorderLevel: 10, lastUpdated: "2023-09-12" },
  { id: 4, name: "Tractor Fuel", category: "Fuel", quantity: 850, unit: "L", status: "In Stock", location: "Fuel Tank", reorderLevel: 200, lastUpdated: "2023-09-09" },
  { id: 5, name: "Protective Gloves", category: "Equipment", quantity: 8, unit: "pairs", status: "Low Stock", location: "Storage C", reorderLevel: 10, lastUpdated: "2023-09-11" },
  { id: 6, name: "Irrigation Pipes", category: "Equipment", quantity: 35, unit: "pieces", status: "In Stock", location: "Storage D", reorderLevel: 20, lastUpdated: "2023-09-07" },
  { id: 7, name: "Phosphate Fertilizer", category: "Fertilizer", quantity: 1200, unit: "kg", status: "In Stock", location: "Storage A", reorderLevel: 300, lastUpdated: "2023-09-05" },
  { id: 8, name: "Wheat Seeds", category: "Seeds", quantity: 0, unit: "bags", status: "Out of Stock", location: "Storage A", reorderLevel: 5, lastUpdated: "2023-09-03" },
];

const categories = ["All Categories", "Fertilizer", "Pesticide", "Seeds", "Fuel", "Equipment"];
const locations = ["All Locations", "Storage A", "Storage B", "Storage C", "Storage D", "Fuel Tank"];
const statuses = ["All Statuses", "In Stock", "Low Stock", "Out of Stock"];

function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  
  // Filter items based on search term and filters
  const filteredItems = mockInventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || item.category === categoryFilter;
    const matchesLocation = locationFilter === "All Locations" || item.location === locationFilter;
    const matchesStatus = statusFilter === "All Statuses" || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
  });
  
  const totalItems = mockInventoryItems.length;
  const lowStockItems = mockInventoryItems.filter(item => item.status === "Low Stock").length;
  const outOfStockItems = mockInventoryItems.filter(item => item.status === "Out of Stock").length;
  
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter("All Categories");
    setLocationFilter("All Locations");
    setStatusFilter("All Statuses");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100 mb-2">
          Inventory Management
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Track and manage your farm inventory, supplies, and equipment
        </p>
      </motion.div>
      
      {/* Statistics Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="card p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
            <Package size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="text-surface-600 dark:text-surface-400 text-sm">Total Items</p>
            <h3 className="text-2xl font-bold">{totalItems}</h3>
          </div>
        </div>
        
        <div className="card p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-4">
            <AlertTriangle size={24} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-surface-600 dark:text-surface-400 text-sm">Low Stock Items</p>
            <h3 className="text-2xl font-bold">{lowStockItems}</h3>
          </div>
        </div>
        
        <div className="card p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4">
            <BarChart2 size={24} className="text-red-500" />
          </div>
          <div>
            <p className="text-surface-600 dark:text-surface-400 text-sm">Out of Stock</p>
            <h3 className="text-2xl font-bold">{outOfStockItems}</h3>
          </div>
        </div>
      </motion.div>
      
      {/* Filters Row */}
      <motion.div 
        className="flex flex-col md:flex-row gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400">
            <Search size={18} />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
              <ChevronDown size={16} />
            </div>
          </div>
          
          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
              <ChevronDown size={16} />
            </div>
          </div>
          
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
              <ChevronDown size={16} />
            </div>
          </div>
          
          {(searchTerm || categoryFilter !== "All Categories" || locationFilter !== "All Locations" || statusFilter !== "All Statuses") && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200"
            >
              Clear Filters
            </button>
          )}
          
          <button className="btn btn-primary ml-auto">
            <Plus size={18} className="mr-1" />
            Add Item
          </button>
        </div>
      </motion.div>
      
      {/* Inventory Table */}
      <motion.div 
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Inventory Items ({filteredItems.length})</h3>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400" title="Refresh">
              <RefreshCw size={16} />
            </button>
            <button className="flex items-center text-sm text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200">
              <Filter size={14} className="mr-1" />
              <span>Filtered Results</span>
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left text-surface-600 dark:text-surface-400 text-sm">
                  <th className="pb-3 font-medium">Item Name</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Quantity</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <tr 
                      key={item.id} 
                      className={`border-t border-surface-200 dark:border-surface-700 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-700/50 ${
                        selectedItem?.id === item.id ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => handleSelectItem(item)}
                    >
                      <td className="py-3 font-medium">{item.name}</td>
                      <td className="py-3 text-surface-700 dark:text-surface-300">{item.category}</td>
                      <td className="py-3">{item.quantity} {item.unit}</td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'In Stock' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                          item.status === 'Low Stock' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                          'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 text-surface-700 dark:text-surface-300">{item.location}</td>
                      <td className="py-3">
                        <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                          <button className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-blue-600 dark:text-blue-400" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-red-600 dark:text-red-400" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-surface-600 dark:text-surface-400">
                      No inventory items found matching your criteria. Try changing your filters or add a new item.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
      
      {/* Selected Item Details */}
      {selectedItem && (
        <motion.div 
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Item Details</h3>
            <div className="flex space-x-2">
              <button className="btn btn-sm btn-outline">
                <Edit size={14} className="mr-1" />
                Edit
              </button>
              <button className="btn btn-sm btn-primary">
                <RefreshCw size={14} className="mr-1" />
                Update Stock
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">{selectedItem.name}</h2>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Category</h4>
                    <p className="font-medium">{selectedItem.category}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Location</h4>
                    <p className="font-medium">{selectedItem.location}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Last Updated</h4>
                    <p className="font-medium">{new Date(selectedItem.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Current Stock</h4>
                      <p className="text-2xl font-semibold">{selectedItem.quantity} <span className="text-sm text-surface-500">{selectedItem.unit}</span></p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Status</h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        selectedItem.status === 'In Stock' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        selectedItem.status === 'Low Stock' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      }`}>
                        {selectedItem.status}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Reorder Level</h4>
                      <p className="font-medium">{selectedItem.reorderLevel} {selectedItem.unit}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Action Required</h4>
                      <p className="font-medium text-surface-700 dark:text-surface-300">
                        {selectedItem.status === 'Out of Stock' ? 'Reorder immediately' : 
                         selectedItem.status === 'Low Stock' ? 'Reorder soon' : 'None required'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="btn btn-primary flex-grow">
                    Add Stock
                  </button>
                  <button className="btn btn-outline flex-grow">
                    Remove Stock
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Inventory;