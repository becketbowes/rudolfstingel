import React from 'react';
import Header from '../components/header/Header.js';
import { useAppContext } from '../context/AppContext';

function ExhibitionView() {
  const { backgroundImage } = useAppContext();

  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  };

  return (
    <div style={appStyle}>
      <Header />
      <h2>Exhibition View</h2>
      {/* Carousel and other components will be added here later */}
    </div>
  );
}

export default ExhibitionView;