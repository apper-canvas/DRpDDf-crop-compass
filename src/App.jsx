import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Fields from './pages/Fields';
import Tasks from './pages/Tasks';
import Inventory from './pages/Inventory';
import Finances from './pages/Finances';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' }
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const changeLanguage = (code) => {
    setCurrentLanguage(code);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">CC</span>
            </motion.div>
            <h1 className="text-xl font-bold text-primary dark:text-primary-light">CropCompass</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors ${location.pathname === '/' ? 'text-primary dark:text-primary-light font-medium' : ''}`}>Dashboard</Link>
            <Link to="/fields" className={`text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors ${location.pathname === '/fields' ? 'text-primary dark:text-primary-light font-medium' : ''}`}>Fields</Link>
            <Link to="/tasks" className={`text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors ${location.pathname === '/tasks' ? 'text-primary dark:text-primary-light font-medium' : ''}`}>Tasks</Link>
            <Link to="/inventory" className={`text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors ${location.pathname === '/inventory' ? 'text-primary dark:text-primary-light font-medium' : ''}`}>Inventory</Link>
            <Link to="/finances" className={`text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors ${location.pathname === '/finances' ? 'text-primary dark:text-primary-light font-medium' : ''}`}>Finances</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden md:block relative">
              <select 
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                className="appearance-none bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
                <Link to="/" className={`py-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors ${location.pathname === '/' ? 'text-primary dark:text-primary-light font-medium' : ''}`}>Dashboard</Link>
                <Link to="/fields" className={`py-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors ${location.pathname === '/fields' ? 'text-primary dark:text-primary-light font-medium' : ''}`}>Fields</Link>
                <Link to="/tasks" className={`py-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors ${location.pathname === '/tasks' ? 'text-primary dark:text-primary-light font-medium' : ''}`}>Tasks</Link>
                <Link to="/inventory" className={`py-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors ${location.pathname === '/inventory' ? 'text-primary dark:text-primary-light font-medium' : ''}`}>Inventory</Link>
                <Link to="/finances" className={`py-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors ${location.pathname === '/finances' ? 'text-primary dark:text-primary-light font-medium' : ''}`}>Finances</Link>
                
                <div className="py-2">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Language</label>
                  <select 
                    value={currentLanguage}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="w-full appearance-none bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fields" element={<Fields />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-surface-600 dark:text-surface-400">
                &copy; {new Date().getFullYear()} CropCompass. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;