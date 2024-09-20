import React, { useState, useEffect } from 'react';
import './App.css';
import image1 from './images/background/background1.png';
import image2 from './images/background/background2.png';
import image3 from './images/background/background3.png';

const images = [image1, image2, image3];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

function App() {
  const [titleState, setTitleState] = useState('initial');
  const backgroundImage = getRandomImage();
  
  useEffect(() => {
    setTitleState('start')
    const timer = setTimeout(() => {
      setTitleState('animated');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap" rel="stylesheet" />
      <div style={appStyle}>
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
        {/* Add more content here */}
      </div>
    </>
  );
}

export default App;