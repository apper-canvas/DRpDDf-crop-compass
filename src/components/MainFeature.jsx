import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Droplet, 
  Sun, 
  Wind, 
  CloudRain, 
  Shovel, 
  Sprout, 
  Tractor, 
  Scissors, 
  AlertTriangle,
  Save,
  Loader2
} from 'lucide-react';

// Mock data for crop activities
const cropActivities = [
  { id: 1, type: "planting", name: "Planting", icon: <Shovel size={18} /> },
  { id: 2, type: "irrigation", name: "Irrigation", icon: <Droplet size={18} /> },
  { id: 3, type: "fertilization", name: "Fertilization", icon: <Sprout size={18} /> },
  { id: 4, type: "pestControl", name: "Pest Control", icon: <Tractor size={18} /> },
  { id: 5, type: "harvesting", name: "Harvesting", icon: <Scissors size={18} /> },
];

function MainFeature({ selectedField }) {
  const [activityType, setActivityType] = useState('');
  const [activityDate, setActivityDate] = useState(new Date().toISOString().split('T')[0]);
  const [activityNotes, setActivityNotes] = useState('');
  const [activityAmount, setActivityAmount] = useState('');
  const [activityUnit, setActivityUnit] = useState('kg');
  const [activities, setActivities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  // Reset form when selected field changes
  useEffect(() => {
    setActivityType('');
    setActivityDate(new Date().toISOString().split('T')[0]);
    setActivityNotes('');
    setActivityAmount('');
    setActivityUnit('kg');
    setFormErrors({});
    setSuccessMessage('');
    
    // Load field-specific activities if a field is selected
    if (selectedField) {
      // In a real app, this would fetch from an API or local storage
      // For demo, we'll generate some random activities
      const mockActivities = [
        {
          id: 101,
          fieldId: selectedField.id,
          type: "planting",
          date: "2023-08-15",
          notes: "Planted hybrid corn variety XC-290",
          amount: "25",
          unit: "kg"
        },
        {
          id: 102,
          fieldId: selectedField.id,
          type: "irrigation",
          date: "2023-08-25",
          notes: "Applied drip irrigation",
          amount: "2500",
          unit: "L"
        },
        {
          id: 103,
          fieldId: selectedField.id,
          type: "fertilization",
          date: "2023-09-05",
          notes: "Applied nitrogen-rich fertilizer",
          amount: "150",
          unit: "kg"
        }
      ];
      
      setActivities(mockActivities);
    } else {
      setActivities([]);
    }
  }, [selectedField]);
  
  const validateForm = () => {
    const errors = {};
    
    if (!activityType) {
      errors.activityType = "Please select an activity type";
    }
    
    if (!activityDate) {
      errors.activityDate = "Please select a date";
    }
    
    if (activityAmount && isNaN(Number(activityAmount))) {
      errors.activityAmount = "Amount must be a number";
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      if (!selectedField) {
        setFormErrors({ general: "Please select a field first" });
        return;
      }
      
      setIsSubmitting(true);
      
      // Simulate API call or local storage saving
      setTimeout(() => {
        const newActivity = {
          id: Date.now(),
          fieldId: selectedField.id,
          type: activityType,
          date: activityDate,
          notes: activityNotes,
          amount: activityAmount,
          unit: activityUnit
        };
        
        setActivities([newActivity, ...activities]);
        
        // Reset form
        setActivityType('');
        setActivityNotes('');
        setActivityAmount('');
        setActivityUnit('kg');
        
        setSuccessMessage("Activity recorded successfully!");
        setIsSubmitting(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }, 1000);
    }
  };
  
  const getActivityIcon = (type) => {
    const activity = cropActivities.find(a => a.type === type);
    return activity ? activity.icon : <AlertTriangle size={18} />;
  };
  
  const getActivityName = (type) => {
    const activity = cropActivities.find(a => a.type === type);
    return activity ? activity.name : "Unknown Activity";
  };
  
  return (
    <div className="space-y-6">
      {/* Field Activity Recorder */}
      <motion.div 
        className="card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <h3 className="font-semibold text-lg">
            {selectedField ? `Record Activity for ${selectedField.name}` : "Field Activity Recorder"}
          </h3>
        </div>
        
        <div className="p-4">
          {!selectedField ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={24} className="text-secondary" />
              </div>
              <h4 className="text-lg font-medium mb-2">No Field Selected</h4>
              <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
                Please select a field from the Fields Overview panel to record activities.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <AnimatePresence>
                {successMessage && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300 flex items-center"
                  >
                    <Check size={18} className="mr-2" />
                    {successMessage}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {formErrors.general && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300">
                  {formErrors.general}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="activityType" className="label">Activity Type</label>
                  <div className="relative">
                    <select 
                      id="activityType"
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value)}
                      className={`select-field ${formErrors.activityType ? 'border-red-500 dark:border-red-500' : ''}`}
                    >
                      <option value="">Select activity type</option>
                      {cropActivities.map(activity => (
                        <option key={activity.id} value={activity.type}>
                          {activity.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  {formErrors.activityType && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.activityType}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="activityDate" className="label">Date</label>
                  <input 
                    type="date"
                    id="activityDate"
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                    className={`input-field ${formErrors.activityDate ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {formErrors.activityDate && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.activityDate}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-1">
                  <label htmlFor="activityAmount" className="label">Amount (optional)</label>
                  <input 
                    type="text"
                    id="activityAmount"
                    value={activityAmount}
                    onChange={(e) => setActivityAmount(e.target.value)}
                    placeholder="e.g. 50"
                    className={`input-field ${formErrors.activityAmount ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {formErrors.activityAmount && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.activityAmount}</p>
                  )}
                </div>
                
                <div className="md:col-span-1">
                  <label htmlFor="activityUnit" className="label">Unit</label>
                  <div className="relative">
                    <select 
                      id="activityUnit"
                      value={activityUnit}
                      onChange={(e) => setActivityUnit(e.target.value)}
                      className="select-field"
                    >
                      <option value="kg">kg</option>
                      <option value="L">L</option>
                      <option value="g">g</option>
                      <option value="units">units</option>
                      <option value="ha">ha</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <label className="label opacity-0 md:block hidden">Submit</label>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        Record Activity
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="activityNotes" className="label">Notes (optional)</label>
                <textarea 
                  id="activityNotes"
                  value={activityNotes}
                  onChange={(e) => setActivityNotes(e.target.value)}
                  placeholder="Enter any additional details about this activity..."
                  rows="3"
                  className="input-field"
                ></textarea>
              </div>
            </form>
          )}
        </div>
      </motion.div>
      
      {/* Activity History */}
      <motion.div 
        className="card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <h3 className="font-semibold text-lg">
            {selectedField ? `${selectedField.name} Activity History` : "Activity History"}
          </h3>
        </div>
        
        <div className="p-4">
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-surface-600 dark:text-surface-400">
                {selectedField 
                  ? "No activities recorded for this field yet." 
                  : "Select a field to view activity history."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-lg border border-surface-200 dark:border-surface-700"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h4 className="font-medium text-surface-800 dark:text-surface-100">
                          {getActivityName(activity.type)}
                        </h4>
                        
                        <div className="flex items-center text-sm text-surface-500 dark:text-surface-400 mt-1 sm:mt-0">
                          <Calendar size={14} className="mr-1" />
                          <span>
                            {new Date(activity.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      
                      {activity.amount && (
                        <div className="text-sm mb-2">
                          <span className="text-surface-600 dark:text-surface-400">Amount: </span>
                          <span className="font-medium text-surface-800 dark:text-surface-200">
                            {activity.amount} {activity.unit}
                          </span>
                        </div>
                      )}
                      
                      {activity.notes && (
                        <p className="text-surface-700 dark:text-surface-300 text-sm mt-1">
                          {activity.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default MainFeature;