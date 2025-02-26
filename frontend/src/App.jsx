import { useState } from 'react';
import Header from "./hooks/header.jsx";
import Main from './hooks/main.jsx';
import { useLocation } from 'react-router-dom';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Page title banner */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} py-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">
            {location.pathname === '/' && 'Home'}
            {location.pathname === '/form' && 'Text Summarizer'}
            {location.pathname === '/about' && 'About Us'}
            {location.pathname === '/contact' && 'Contact Us'}
          </h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {location.pathname === '/' && 'Welcome to Clipote text summarization tool'}
            {location.pathname === '/form' && 'Condense your text into clear, concise summaries'}
            {location.pathname === '/about' && 'Learn more about our mission and technology'}
            {location.pathname === '/contact' && 'Get in touch with our team'}
          </p>
        </div>
      </div>
      
      {/* Main content area */}
      <main className="flex-grow">
        <div className={`transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Main darkMode={darkMode} />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} py-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; 2025 Clipote. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:underline">Privacy Policy</a>
              <a href="#" className="text-sm hover:underline">Terms of Service</a>
              <a href="#" className="text-sm hover:underline">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;