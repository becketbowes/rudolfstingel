import React from 'react';
import Header from '../components/header/Header.js';
import YearMenu from '../components/yearmenu/YearMenu.js';
import Carousel from '../components/carousel/Carousel.js';
import { useAppContext } from '../context/AppContext';

function Home() {
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
      <YearMenu />
      <Carousel />
    </div>
  );
}

export default Home;