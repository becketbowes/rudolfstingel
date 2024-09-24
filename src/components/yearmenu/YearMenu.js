import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import './YearMenu.css'

const YearMenu = () => {
  const { exhibitions, selectedYear, setSelectedYear } = useAppContext();
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const yearsContainerRef = useRef(null);

  const years = Object.keys(exhibitions).sort((a, b) => b - a);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHorizontal && selectedYear) {
      centerSelectedYear();
    }
  }, [isHorizontal, selectedYear]);

  const centerSelectedYear = () => {
    if (yearsContainerRef.current) {
      const container = yearsContainerRef.current;
      const selectedYearElement = container.querySelector(`.year-button.selected`);
      if (selectedYearElement) {
        const scrollLeft = selectedYearElement.offsetLeft - (container.clientWidth / 2) + (selectedYearElement.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  };

  const handleYearClick = (year) => {
    if (year === selectedYear && !selectedExhibition) {
      setSelectedYear(null);
    } else {
      setSelectedYear(year);
      setSelectedExhibition(null);
    }
  };

  const handleExhibitionClick = (exhibition) => {
    setSelectedExhibition(exhibition);
    setIsHorizontal(true);
  };

  return (
    <div className={`year-menu ${isHorizontal ? 'horizontal' : 'vertical'} ${isVisible ? 'visible' : ''}`}>
      <div className="years-container" ref={yearsContainerRef}>
        {years.map(year => (
          <div key={year} className="year-section">
            <button
              className={`year-button ${year === selectedYear ? 'selected' : ''}`}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </button>
            {year === selectedYear && !selectedExhibition && (
              <div className="exhibitions-container">
                {exhibitions[year].map(exhibition => (
                  <button 
                    key={exhibition.id} 
                    className="exhibition-button"
                    onClick={() => handleExhibitionClick(exhibition)}
                  >
                    {exhibition.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedExhibition && (
        <div className="selected-exhibition">
          <button 
            className="exhibition-button selected"
            onClick={() => setSelectedExhibition(null)}
          >
            {selectedExhibition.title}
          </button>
        </div>
      )}
    </div>
  );
};

export default YearMenu;