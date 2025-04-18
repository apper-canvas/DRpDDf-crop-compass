import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronDown, 
  ChevronUp,
  Plus,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';
import MainFeature from '../components/MainFeature';

// Mock data for demonstration
const mockFields = [
  { id: 1, name: "North Field", size: 12.5, crop: "Corn", status: "Growing", progress: 65 },
  { id: 2, name: "South Pasture", size: 8.3, crop: "Wheat", status: "Ready for harvest", progress: 95 },
  { id: 3, name: "East Orchard", size: 5.7, crop: "Apples", status: "Flowering", progress: 40 },
  { id: 4, name: "West Plot", size: 3.2, crop: "Soybeans", status: "Planting", progress: 10 },
];

const mockTasks = [
  { id: 1, title: "Irrigate North Field", priority: "high", dueDate: "2023-09-15", status: "pending" },
  { id: 2, title: "Apply fertilizer to South Pasture", priority: "medium", dueDate: "2023-09-18", status: "in-progress" },
  { id: 3, title: "Harvest East Orchard apples", priority: "high", dueDate: "2023-09-20", status: "pending" },
  { id: 4, title: "Repair irrigation system", priority: "low", dueDate: "2023-09-25", status: "pending" },
];

const mockWeather = {
  current: {
    temp: 24,
    humidity: 65,
    windSpeed: 12,
    precipitation: 0,
    condition: "Partly Cloudy"
  },
  forecast: [
    { day: "Today", high: 24, low: 16, condition: "Partly Cloudy", precipitation: 10 },
    { day: "Tomorrow", high: 26, low: 17, condition: "Sunny", precipitation: 0 },
    { day: "Wed", high: 28, low: 18, condition: "Sunny", precipitation: 0 },
    { day: "Thu", high: 25, low: 17, condition: "Cloudy", precipitation: 30 },
    { day: "Fri", high: 22, low: 15, condition: "Rain", precipitation: 80 },
  ]
};

function Home() {
  const [selectedField, setSelectedField] = useState(null);
  const [weatherExpanded, setWeatherExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState("synced"); // "synced", "pending", "failed"
  
  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Simulate sync after coming back online
      setSyncStatus("pending");
      setTimeout(() => setSyncStatus("synced"), 2000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus("pending");
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  const toggleWeatherExpanded = () => {
    setWeatherExpanded(!weatherExpanded);
  };
  
  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };
  
  // Get current date and time
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Offline/Sync Status Banner */}
      {!isOnline && (
        <div className="mb-6 bg-secondary-light/20 border border-secondary rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle size={20} className="text-secondary mr-2" />
            <p className="text-surface-800 dark:text-surface-200">
              You're currently offline. Changes will be saved locally and synced when you reconnect.
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-surface-600 dark:text-surface-400 mr-2">
              {syncStatus === "pending" ? "Pending sync" : 
               syncStatus === "failed" ? "Sync failed" : "All changes saved"}
            </span>
            <div className={`w-3 h-3 rounded-full ${
              syncStatus === "synced" ? "bg-green-500" : 
              syncStatus === "pending" ? "bg-yellow-500" : "bg-red-500"
            }`}></div>
          </div>
        </div>
      )}
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100 mb-2">
            Farm Dashboard
          </h1>
          <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm">
            <Calendar size={16} className="mr-1" />
            <span className="mr-4">{currentDate}</span>
            <Clock size={16} className="mr-1" />
            <span>{currentTime}</span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="btn btn-primary">
            <Plus size={18} className="mr-1" />
            New Task
          </button>
          <button className="btn btn-outline">
            View Reports
          </button>
        </div>
      </div>
      
      {/* Weather Card */}
      <motion.div 
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className="p-4 cursor-pointer flex justify-between items-center"
          onClick={toggleWeatherExpanded}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
              <Cloud size={24} className="text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-surface-800 dark:text-surface-100">
                Current Weather
              </h3>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                <MapPin size={14} className="inline mr-1" />
                Farm Location
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="text-right mr-6">
              <div className="text-2xl font-bold text-surface-800 dark:text-surface-100">
                {mockWeather.current.temp}°C
              </div>
              <div className="text-surface-600 dark:text-surface-400 text-sm">
                {mockWeather.current.condition}
              </div>
            </div>
            {weatherExpanded ? 
              <ChevronUp size={20} className="text-surface-500" /> : 
              <ChevronDown size={20} className="text-surface-500" />
            }
          </div>
        </div>
        
        {weatherExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 border-t border-surface-200 dark:border-surface-700"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-6">
              <div className="flex items-center">
                <Thermometer size={20} className="text-red-500 mr-2" />
                <div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Temperature</div>
                  <div className="font-semibold">{mockWeather.current.temp}°C</div>
                </div>
              </div>
              <div className="flex items-center">
                <Droplets size={20} className="text-blue-500 mr-2" />
                <div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Humidity</div>
                  <div className="font-semibold">{mockWeather.current.humidity}%</div>
                </div>
              </div>
              <div className="flex items-center">
                <Wind size={20} className="text-teal-500 mr-2" />
                <div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Wind Speed</div>
                  <div className="font-semibold">{mockWeather.current.windSpeed} km/h</div>
                </div>
              </div>
              <div className="flex items-center">
                <Cloud size={20} className="text-purple-500 mr-2" />
                <div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Precipitation</div>
                  <div className="font-semibold">{mockWeather.current.precipitation}%</div>
                </div>
              </div>
            </div>
            
            <h4 className="font-semibold mb-3">5-Day Forecast</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {mockWeather.forecast.map((day, index) => (
                <div key={index} className="bg-surface-50 dark:bg-surface-700 rounded-lg p-3 text-center">
                  <div className="font-medium mb-1">{day.day}</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">{day.condition}</div>
                  <div className="flex justify-center items-center space-x-2">
                    <span className="text-red-500">{day.high}°</span>
                    <span className="text-xs text-surface-400">|</span>
                    <span className="text-blue-500">{day.low}°</span>
                  </div>
                  <div className="text-xs text-surface-500 mt-1">
                    <Droplets size={12} className="inline mr-1" />
                    {day.precipitation}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fields Overview */}
        <motion.div 
          className="card lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-4 border-b border-surface-200 dark:border-surface-700">
            <h3 className="font-semibold text-lg">Fields Overview</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {mockFields.map(field => (
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
              ))}
            </div>
            
            <button className="w-full mt-4 btn btn-outline flex items-center justify-center">
              <Plus size={16} className="mr-1" />
              Add New Field
            </button>
          </div>
        </motion.div>
        
        {/* Main Feature Component */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MainFeature selectedField={selectedField} />
        </motion.div>
      </div>
      
      {/* Tasks Section */}
      <motion.div 
        className="card mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Upcoming Tasks</h3>
          <button className="text-sm text-primary dark:text-primary-light hover:underline">
            View All
          </button>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left text-surface-600 dark:text-surface-400 text-sm">
                  <th className="pb-3 font-medium">Task</th>
                  <th className="pb-3 font-medium">Priority</th>
                  <th className="pb-3 font-medium">Due Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTasks.map(task => (
                  <tr key={task.id} className="border-t border-surface-200 dark:border-surface-700">
                    <td className="py-3 font-medium">{task.title}</td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                        task.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      }`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 text-surface-600 dark:text-surface-400">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        task.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                        'bg-surface-200 dark:bg-surface-600 text-surface-800 dark:text-surface-200'
                      }`}>
                        {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-green-600 dark:text-green-400" title="Complete">
                          <Check size={18} />
                        </button>
                        <button className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-red-600 dark:text-red-400" title="Delete">
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;