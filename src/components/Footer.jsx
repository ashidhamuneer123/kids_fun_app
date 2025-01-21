import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-8">
      <p className="text-sm">&copy; {new Date().getFullYear()} ash@tech. All Rights Reserved.</p>
      <p className="text-xs">
        Built with ❤️ by <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ashidha Muneer</a>
      </p>
    </footer>
  );
};

export default Footer;
