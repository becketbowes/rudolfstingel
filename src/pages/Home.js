import React from 'react';
import Header from '../components/header/Header.js';
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
      {/* YearMenu and ExhibitionList components will be added here later */}
    </div>
  );
}

export default Home;