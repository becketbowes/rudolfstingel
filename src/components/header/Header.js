import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import './Header.css';

function Header() {
  const [titleState, setTitleState] = useState('initial');
  const { selectedExhibition } = useAppContext();

  useEffect(() => {
    setTitleState('start')
    const timer = setTimeout(() => {
      setTitleState('animated');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedExhibition) {
      setTitleState('exhibition-selected');
    } else {
      setTitleState('animated');
    }
  }, [selectedExhibition]);

  return (
    <h1 className={`title ${titleState}`}>
      Rudolf Stingel
    </h1>
  );
}

export default Header;