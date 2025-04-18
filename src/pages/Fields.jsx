import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Calendar } from 'lucide-react';

// Mock data for demonstration
const mockFields = [
  { id: 1, name: "North Field", size: 12.5, crop: "Corn", status: "Growing", progress: 65, lastActivity: "2023-09-10", soilType: "Loam" },
  { id: 2, name: "South Pasture", size: 8.3, crop: "Wheat", status: "Ready for harvest", progress: 95, lastActivity: "2023-09-12", soilType: "Clay Loam" },
  { id: 3, name: "East Orchard", size: 5.7, crop: "Apples", status: "Flowering", progress: 40, lastActivity: "2023-09-05", soilType: "Sandy Loam" },
  { id: 4, name: "West Plot", size: 3.2, crop: "Soybeans", status: "Planting", progress: 10, lastActivity: "2023-09-08", soilType: "Silt Loam" },
  { id: 5, name: "Riverside Field", size: 6.8, crop: "Cotton", status: "Growing", progress: 55, lastActivity: "2023-09-07", soilType: "Sandy" },
  { id: 6, name: "Hillside Vineyard", size: 4.5, crop: "Grapes", status: "Fruiting", progress: 70, lastActivity: "2023-09-11", soilType: "Clay" },
];

function Fields() {
  const [selectedField, setSelectedField] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFields = mockFields.filter(field => 
    field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFieldSelect = (field) => {
    setSelectedField(field);
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
          Field Management
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Manage your fields, monitor crop status, and plan activities
        </p>
      </motion.div>

      {/* Search and Control Bar */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex space-x-3 w-full md:w-auto">
          <button className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors flex-grow md:flex-grow-0">
            <Plus size={18} className="mr-1" />
            Add Field
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors flex-grow md:flex-grow-0">
            Import Fields
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fields List */}
        <motion.div 
          className="card lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-4 border-b border-surface-200 dark:border-surface-700">
            <h3 className="font-semibold text-lg">All Fields ({filteredFields.length})</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {filteredFields.length > 0 ? (
                filteredFields.map(field => (
                  <div 
                    key={field.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedField?.id === field.id 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'bg-surface-50 dark:bg-surface-700/50 hover:bg-surface-100 dark:hover:bg-surface-700 border border-transparent'
                    }`}
                    onClick={() => handleFieldSelect(field)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{field.name}</h4>
                      <span className="text-sm bg-surface-200 dark:bg-surface-600 px-2 py-0.5 rounded-full">
                        {field.size} ha
                      </span>
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                      Crop: <span className="font-medium text-surface-800 dark:text-surface-200">{field.crop}</span>
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-400 mb-3">
                      Status: <span className="font-medium text-surface-800 dark:text-surface-200">{field.status}</span>
                    </div>
                    <div className="w-full bg-surface-200 dark:bg-surface-600 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${field.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right mt-1 text-surface-500 dark:text-surface-400">
                      {field.progress}% complete
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-surface-500 dark:text-surface-400">
                  No fields found matching your search.
                </div>
              )}
            </div>
            
            <button className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors">
              <Plus size={16} className="mr-1" />
              Add New Field
            </button>
          </div>
        </motion.div>
        
        {/* Field Details */}
        <motion.div 
          className="card lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {selectedField ? (
            <>
              <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
                <h3 className="font-semibold text-lg">{selectedField.name} Details</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors">Edit</button>
                  <button className="px-3 py-1 text-sm border border-red-500 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors">Delete</button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Field Size</h4>
                      <p className="font-semibold">{selectedField.size} hectares</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Crop Type</h4>
                      <p className="font-semibold">{selectedField.crop}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Soil Type</h4>
                      <p className="font-semibold">{selectedField.soilType}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Location</h4>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1 text-surface-500" />
                        <p className="font-semibold">Farm Location</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Current Status</h4>
                      <p className="font-semibold">{selectedField.status}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Growth Progress</h4>
                      <div className="w-full bg-surface-200 dark:bg-surface-600 rounded-full h-2.5 overflow-hidden mt-2 mb-1">
                        <div 
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${selectedField.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-xs text-surface-500">{selectedField.progress}% complete</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Last Activity</h4>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1 text-surface-500" />
                        <p className="font-semibold">{new Date(selectedField.lastActivity).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Upcoming Tasks for {selectedField.name}</h4>
                  <div className="bg-surface-50 dark:bg-surface-700/50 rounded-lg p-4">
                    <div className="text-center py-6">
                      <p className="text-surface-600 dark:text-surface-400 mb-4">No upcoming tasks scheduled for this field.</p>
                      <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors">
                        <Plus size={16} className="mr-1 inline" />
                        Schedule Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-700 mx-auto flex items-center justify-center mb-4">
                <MapPin size={24} className="text-surface-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Field Selected</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md mx-auto">
                Select a field from the list to view its details, or add a new field to get started.
              </p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors">
                <Plus size={18} className="mr-1 inline" />
                Add New Field
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Fields;