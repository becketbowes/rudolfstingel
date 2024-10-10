import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import ExhibitionView from './pages/Exhibition.js';
import { AppProvider } from './context/AppContext';
import './styles/global.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exhibition/:id" element={<ExhibitionView />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
