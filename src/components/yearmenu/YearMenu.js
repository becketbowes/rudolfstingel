

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import './YearMenu.css'

const YearMenu = () => {
  const { exhibitions, selectedYear, setSelectedYear, selectedExhibition, setSelectedExhibition, isHorizontal, setIsHorizontal} = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const yearsContainerRef = useRef(null);

  const years = Object.keys(exhibitions).sort((a, b) => b - a);

  const centerSelectedYear = useCallback(() => {
    if (yearsContainerRef.current && selectedYear) {
      const container = yearsContainerRef.current;
      const selectedYearElement = container.querySelector(`.year-button.selected`);
      if (selectedYearElement) {
        const scrollLeft = selectedYearElement.offsetLeft - (container.clientWidth / 2) + (selectedYearElement.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedYear]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHorizontal) {
      centerSelectedYear();
    }
  }, [isHorizontal, selectedYear, centerSelectedYear]);

  useEffect(() => {
    if (isHorizontal && selectedYear) {
      setTimeout(() => { 
        centerSelectedYear();
      }, 1500);
    }
  }, [isHorizontal, selectedYear, centerSelectedYear]);

  useEffect(() => {
    if (isHorizontal) {
      document.body.classList.add('exhibition-selected');
    } else {
      document.body.classList.remove('exhibition-selected');
    }
  }, [isHorizontal]);

  const handleYearClick = (year) => {
    if (year === selectedYear && !selectedExhibition) {
      setSelectedYear(null);
    } else {
      setSelectedYear(year);
      setSelectedExhibition(null);
    }
  };

  const handleExhibitionClick = (exhibition) => {
    if (!isHorizontal) {
      centerSelectedYear()
      setTimeout(() => {
        setIsHorizontal(true);
        setSelectedExhibition(exhibition);
      }, 500);
    } else {
      setIsHorizontal(true);
      setSelectedExhibition(exhibition)
    }
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