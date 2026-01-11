import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Ignore if typing in a text field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // 2. THE BRAILLE ADJUSTMENT:

      if (!e.altKey) return; 

      const key = e.key.toLowerCase();
      
      const routes = {
        'i': { path: '/info', label: 'Information' },
        'u': { path: '/upload', label: 'Upload' },
        'h': { path: '/history', label: 'History' },
        's': { path: '/settings', label: 'Settings' },
        'l': { path: '/', label: 'Home' }, 
      };

      if (routes[key]) {
        // 3. Prevent the browser from opening its own menus (e.g., Alt+S)
        e.preventDefault(); 
        
        // 4. Update the message for the Braille display
        setAnnouncement(""); 
        
        setTimeout(() => {
          setAnnouncement(`Navigating to ${routes[key].label} page`);
          navigate(routes[key].path);
        }, 50);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return { announcement };
};