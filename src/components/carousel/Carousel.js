import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import './Carousel.css';

const Carousel = () => {
  const { selectedExhibition } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedExhibition]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === selectedExhibition?.images.length ? prevIndex : prevIndex + 1
    );
  }, [selectedExhibition]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!selectedExhibition) return null;

  const handleTouchStart = (e) => {
    if (e.touches.length > 1) {
      e.stopPropagation();
      return;
    }
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

  const renderIndicators = () => {
    const totalDots = selectedExhibition.images.length + 1; // +1 for the info page
    return (
      <div className="carousel-indicators" role="tablist">
        {[...Array(totalDots)].map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  // Add CSS to prevent unwanted touch behaviors
  const carouselStyles = {
    touchAction: 'pan-y pinch-zoom', // Allow vertical scrolling and pinch zoom
  };

  return (
    <div 
      className="carousel-outer-container"
      role="region"
      aria-roledescription="carousel"
      aria-label="Exhibition images"
    >
      <div 
        className="carousel-container"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={carouselStyles}
      >
        <div className="carousel-slide-container">
          {selectedExhibition.images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
              style={{transform: `translateX(${100 * (index - currentIndex)}%)`}}
              role="tabpanel"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${selectedExhibition.images.length}`}
              aria-hidden={index !== currentIndex}
            >
              <img src={require(`../../${image.path}`)} alt={`Exhibition view ${index + 1}`} />
              {image.text && (
                <div className="image-text">
                  {image.text}
                </div>
              )}
            </div>
          ))}
          
          {currentIndex === selectedExhibition.images.length && (
            <div 
              className="show-page"
              role="tabpanel"
              aria-roledescription="slide"
              aria-label={`Exhibition information`}
            >
              <h2>{selectedExhibition.title}</h2>
              <p>{selectedExhibition.description}</p>
              <div className="links">
                <a href={selectedExhibition.externalLink} target="_blank" rel="noopener noreferrer">Venue Website</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {renderIndicators()}

      {!isMobile && (
        <>
          <button 
            className="carousel-button prev" 
            onClick={prevSlide} 
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <button 
            className="carousel-button next" 
            onClick={nextSlide} 
            disabled={currentIndex === selectedExhibition.images.length}
            aria-label="Next slide"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;


// import React, { useState, useEffect, useRef } from 'react';
// import { useAppContext } from '../../context/AppContext';
// import './Carousel.css';

// const Carousel = () => {
//   const { selectedExhibition } = useAppContext();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 1200);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     setCurrentIndex(0);
//   }, [selectedExhibition]);

//   if (!selectedExhibition) return null;

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 75) {
//       nextSlide();
//     }

//     if (touchStart - touchEnd < -75) {
//       prevSlide();
//     }
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === selectedExhibition.images.length ? prevIndex : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
//   };

//   const renderIndicators = () => {
//     const totalDots = selectedExhibition.images.length + 1; // +1 for the info page
//     return (
//       <div className="carousel-indicators">
//         {[...Array(totalDots)].map((_, index) => (
//           <span
//             key={index}
//             className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="carousel-outer-container">
//       <div 
//         className="carousel-container"
//         ref={carouselRef}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div className="carousel-slide-container">
//           {selectedExhibition.images.map((image, index) => (
//             <div
//               key={index}
//               className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
//               style={{transform: `translateX(${100 * (index - currentIndex)}%)`}}
//             >
//               <img src={require(`../../${image.path}`)} alt={`Exhibition view ${index + 1}`} />
//               {image.text && (
//                 <div className="image-text">
//                   {image.text}
//                 </div>
//               )}
//             </div>
//           ))}
          
//           {currentIndex === selectedExhibition.images.length && (
//             <div className="show-page">
//               <h2>{selectedExhibition.title}</h2>
//               <p>{selectedExhibition.description}</p>
//               <div className="links">
//                 <a href={selectedExhibition.externalLink} target="_blank" rel="noopener noreferrer">Venue Website</a>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {renderIndicators()}

//       {!isMobile && (
//         <>
//           <button className="carousel-button prev" onClick={prevSlide} disabled={currentIndex === 0}>
//             &lt;
//           </button>
//           <button 
//             className="carousel-button next" 
//             onClick={nextSlide} 
//             disabled={currentIndex === selectedExhibition.images.length}
//           >
//             &gt;
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Carousel;

