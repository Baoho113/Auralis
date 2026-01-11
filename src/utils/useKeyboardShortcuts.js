import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

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
        e.preventDefault(); 
        
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