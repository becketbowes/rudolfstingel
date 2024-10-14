
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import './YearMenu.css'

const YearMenu = () => {
  const { exhibitions, selectedYear, setSelectedYear, selectedExhibition, setSelectedExhibition, isHorizontal, setIsHorizontal} = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const yearsContainerRef = useRef(null);

  const getSortedYears = useCallback(() => {
    const years = Object.keys(exhibitions);
    return isHorizontal ? years.sort((a, b) => a - b) : years.sort((a, b) => b - a);
  }, [exhibitions, isHorizontal]);

  const years = getSortedYears();

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
    }, 100);

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
      }, 100);
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
      }, 100);
    } else {
      setIsHorizontal(true);
      setSelectedExhibition(exhibition)
    }
  };

  return (
    <nav 
      className={`year-menu ${isHorizontal ? 'horizontal' : 'vertical'} ${isVisible ? 'visible' : ''}`}
      aria-label="Exhibition years and titles"
    >
      <div 
        className="years-container" 
        ref={yearsContainerRef}
        role="list"
      >
        {years.map(year => (
          <div key={year} className="year-section" role="listitem">
            <button
              className={`year-button ${year === selectedYear ? 'selected' : ''}`}
              onClick={() => handleYearClick(year)}
              aria-expanded={year === selectedYear && !selectedExhibition}
              aria-haspopup="true"
              aria-label={`Year ${year}${year === selectedYear ? ', selected' : ''}`}
            >
              {year}
            </button>
            {year === selectedYear && !selectedExhibition && (
              <div 
                className="exhibitions-container"
                role="list"
                aria-label={`Exhibitions for ${year}`}
              >
                {exhibitions[year].map(exhibition => (
                  <button 
                    key={exhibition.id} 
                    className="exhibition-button"
                    onClick={() => handleExhibitionClick(exhibition)}
                    role="listitem"
                    aria-label={`Exhibition: ${exhibition.title}`}
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
        <div className="selected-exhibition" aria-live="polite">
          <button 
            className="exhibition-button selected"
            onClick={() => setSelectedExhibition(null)}
            aria-label={`Selected exhibition: ${selectedExhibition.title}. Click to deselect.`}
          >
            {selectedExhibition.title}
          </button>
        </div>
      )}
    </nav>
  );
};

export default YearMenu;
