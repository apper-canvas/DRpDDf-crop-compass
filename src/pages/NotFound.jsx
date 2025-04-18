import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
            <span className="text-6xl font-bold text-surface-400">404</span>
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
            !
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-surface-800 dark:text-surface-100">
          Page Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-outline"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;