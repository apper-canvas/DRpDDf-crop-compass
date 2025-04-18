import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Check, 
  X, 
  Calendar, 
  Clock,
  Filter,
  ChevronDown
} from 'lucide-react';

// Mock data for demonstration
const mockTasks = [
  { id: 1, title: "Irrigate North Field", priority: "high", dueDate: "2023-09-15", status: "pending", assignee: "John Smith", field: "North Field", description: "Apply 2 inches of water to the corn field." },
  { id: 2, title: "Apply fertilizer to South Pasture", priority: "medium", dueDate: "2023-09-18", status: "in-progress", assignee: "Maria Garcia", field: "South Pasture", description: "Apply nitrogen fertilizer according to soil test recommendations." },
  { id: 3, title: "Harvest East Orchard apples", priority: "high", dueDate: "2023-09-20", status: "pending", assignee: "David Johnson", field: "East Orchard", description: "Harvest ripe apples and prepare for market delivery." },
  { id: 4, title: "Repair irrigation system", priority: "low", dueDate: "2023-09-25", status: "pending", assignee: "Sarah Williams", field: "West Plot", description: "Fix leaking connections in the drip irrigation system." },
  { id: 5, title: "Scout for pests in Riverside Field", priority: "medium", dueDate: "2023-09-16", status: "completed", assignee: "James Brown", field: "Riverside Field", description: "Check for pest presence and document findings." },
  { id: 6, title: "Prune Hillside Vineyard", priority: "medium", dueDate: "2023-09-22", status: "pending", assignee: "Maria Garcia", field: "Hillside Vineyard", description: "Perform summer pruning to improve air circulation." },
  { id: 7, title: "Plant cover crops in North Field", priority: "low", dueDate: "2023-09-30", status: "pending", assignee: "John Smith", field: "North Field", description: "Plant winter rye as a cover crop after harvest." },
  { id: 8, title: "Calibrate sprayer", priority: "high", dueDate: "2023-09-17", status: "in-progress", assignee: "David Johnson", field: "Equipment", description: "Calibrate sprayer for precise application rates." },
];

function Tasks() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  
  // Filter tasks based on search and filters
  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const handleNewTask = () => {
    console.log('Creating new task');
  };

  const handleCompleteTask = (taskId) => {
    console.log('Marking task as complete:', taskId);
  };

  const handleRejectTask = (taskId) => {
    console.log('Rejecting task:', taskId);
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
          Task Management
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Schedule, track, and manage farm tasks and activities
        </p>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div 
        className="flex flex-col md:flex-row gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search tasks..."
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

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
              <ChevronDown size={16} />
            </div>
          </div>

          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
              <ChevronDown size={16} />
            </div>
          </div>

          {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all') && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200"
            >
              Clear Filters
            </button>
          )}

          <button 
            onClick={handleNewTask}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors ml-auto"
          >
            <Plus size={18} className="mr-1" />
            New Task
          </button>
        </div>
      </motion.div>

      {/* Tasks Table */}
      <motion.div 
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Tasks ({filteredTasks.length})</h3>
          <div className="flex items-center text-surface-600 dark:text-surface-400">
            <Filter size={16} className="mr-1" />
            <span className="text-sm">Filtered Results</span>
          </div>
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
                  <th className="pb-3 font-medium">Assignee</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <tr 
                      key={task.id} 
                      className={`border-t border-surface-200 dark:border-surface-700 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-700/50 ${
                        selectedTask?.id === task.id ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => handleTaskSelect(task)}
                    >
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
                      <td className="py-3 text-surface-700 dark:text-surface-300">{task.assignee}</td>
                      <td className="py-3">
                        <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={() => handleCompleteTask(task.id)}
                            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-green-600 dark:text-green-400"
                          >
                            <Check size={18} />
                          </button>
                          <button 
                            onClick={() => handleRejectTask(task.id)}
                            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-red-600 dark:text-red-400"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-surface-600 dark:text-surface-400">
                      No tasks found matching your criteria. Try changing your filters or create a new task.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Task Details */}
      {selectedTask && (
        <motion.div 
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Task Details</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => console.log('Edit task:', selectedTask.id)}
                className="px-3 py-1 text-sm border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => console.log('Delete task:', selectedTask.id)}
                className="px-3 py-1 text-sm border border-red-500 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">{selectedTask.title}</h2>
                <p className="text-surface-700 dark:text-surface-300 mb-6">{selectedTask.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Field</h4>
                    <p className="font-medium">{selectedTask.field}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Assignee</h4>
                    <p className="font-medium">{selectedTask.assignee}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Priority</h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        selectedTask.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                        selectedTask.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      }`}>
                        {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Status</h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        selectedTask.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        selectedTask.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                        'bg-surface-200 dark:bg-surface-600 text-surface-800 dark:text-surface-200'
                      }`}>
                        {selectedTask.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Due Date</h4>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-surface-500" />
                        <span>{new Date(selectedTask.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Created</h4>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-surface-500" />
                        <span>3 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  {selectedTask.status !== 'completed' ? (
                    <button 
                      onClick={() => console.log('Mark complete:', selectedTask.id)}
                      className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors flex-grow"
                    >
                      <Check size={18} className="mr-1" />
                      Mark Complete
                    </button>
                  ) : (
                    <button 
                      onClick={() => console.log('Mark incomplete:', selectedTask.id)}
                      className="flex items-center justify-center px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors flex-grow"
                    >
                      <X size={18} className="mr-1" />
                      Mark Incomplete
                    </button>
                  )}
                  <button 
                    onClick={() => console.log('Reassign task:', selectedTask.id)}
                    className="flex items-center justify-center px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors flex-grow"
                  >
                    Reassign
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

export default Tasks;