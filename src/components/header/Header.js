import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import './Header.css';

function Header() {
  const [titleState, setTitleState] = useState('initial');
  const { selectedYear, selectedExhibition } = useAppContext();

  useEffect(() => {
    setTitleState('start')
    const timer = setTimeout(() => {
      setTitleState('animated');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedExhibition) {
      setTitleState('menu-selected');
    } else if (selectedYear) {
      setTitleState('year-selected');
    }
  }, [selectedYear, selectedExhibition]);

  return (
    <h1 
      className={`title ${titleState}`}
      style={{ 
        color: 'white', 
        fontFamily: "'Outfit', sans-serif", 
        fontWeight: 700,
        fontSize: '3rem',
        margin: 0,
        padding: '20px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
      }}
    >
      Rudolf Stingel
    </h1>
  );
}

export default Header;