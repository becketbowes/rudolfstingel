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

  const handleTitleClick = () => {
    setSelectedYear(null);
    setSelectedExhibition(null);
    setIsHorizontal(false);
    setTitleState('animated');
  };

  return (
    <button className={`title-button ${titleState}`} onClick={handleTitleClick}>  
      <h1 className={`title ${titleState}`}>
        Rudolf Stingel
      </h1>
    </button>
  );
}

export default Header;