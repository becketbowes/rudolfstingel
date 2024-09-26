import React, { createContext, useContext, useState } from 'react';
import { exhibitions } from '../data/Exhibitions';
import image1 from '../assets/images/background/background1.png';
import image2 from '../assets/images/background/background2.png';
import image3 from '../assets/images/background/background3.png';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const images = [image1, image2, image3];

export const AppProvider = ({ children }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [backgroundImage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  });

  return (
    <AppContext.Provider value={{
      exhibitions,
      selectedYear,
      setSelectedYear,
      selectedExhibition,
      setSelectedExhibition,
      isHorizontal,
      setIsHorizontal,
      backgroundImage,
    }}>
      {children}
    </AppContext.Provider>
  );
};