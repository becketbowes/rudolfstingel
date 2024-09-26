import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext'; // Update this path
import './Carousel.css';

const ExhibitionCarousel = () => {
  const { selectedExhibition } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Reset current index when a new exhibition is selected
    setCurrentIndex(0);
  }, [selectedExhibition]);

  if (!selectedExhibition) return null;

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === selectedExhibition.images.length ? prevIndex : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  return (
    <div 
      className="carousel-container"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {selectedExhibition.images.map((image, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          style={{transform: `translateX(${100 * (index - currentIndex)}%)`}}
        >
          <img src={image} alt={`Exhibition View ${index + 1}`} />
        </div>
      ))}
      
      {currentIndex === selectedExhibition.images.length && (
        <div className="show-page">
          <h2>{selectedExhibition.title}</h2>
          <p>{selectedExhibition.description}</p>
          <div className="links">
            <a href={selectedExhibition.pressRelease} target="_blank" rel="noopener noreferrer">Press Release</a>
            <a href={selectedExhibition.workList} target="_blank" rel="noopener noreferrer">Work List</a>
            <a href={selectedExhibition.externalLink} target="_blank" rel="noopener noreferrer">External Link</a>
          </div>
        </div>
      )}

      {!isMobile && (
        <>
          <button className="carousel-button prev" onClick={prevSlide} disabled={currentIndex === 0}>
            &lt;
          </button>
          <button 
            className="carousel-button next" 
            onClick={nextSlide} 
            disabled={currentIndex === selectedExhibition.images.length}
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default ExhibitionCarousel;