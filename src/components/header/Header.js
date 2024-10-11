import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import './Header.css';

function Header() {
  const [titleState, setTitleState] = useState('initial');
  const { setSelectedYear, setSelectedExhibition, isHorizontal, setIsHorizontal } = useAppContext();

  useEffect(() => {
    setTitleState('start')
    const timer = setTimeout(() => {
      setTitleState('animated');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHorizontal) {
      setTitleState('horizontal-menu');
    } else {
      setTitleState('animated');
    }
  }, [isHorizontal]);

  const handleReset = () => {
    setSelectedYear(null);
    setSelectedExhibition(null);
    setIsHorizontal(false);
    setTitleState('animated');
  };

  return (
    <header role="banner" className="fixed-header">
      <button 
        className="reset-button" 
        onClick={handleReset} 
        aria-label="Reset to home page"
      >
        <span className="sr-only">Reset</span>
      </button>
      <h1 
        className={`title ${titleState}`}
        aria-live="polite"
        aria-atomic="true"
      >
        Rudolf Stingel
      </h1>
      <nav aria-label="Main navigation" className={isHorizontal ? 'visible' : 'hidden'}>
        {/* Add your navigation items here when in horizontal mode */}
      </nav>
    </header>
  );
}

export default Header;