import { useState } from 'react';
import './App.css';
// import "react-animated-term/dist/react-animated-term.css";
import Homepage from './pages/Homepage';
import SuggestionV1 from './pages/Suggestion.js';
import Suggestion from './pages/Suggestion/index';
import TrendAnalysis from './pages/TrendAnalysis';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/suggestion-v1" element={<SuggestionV1 />}/>
        <Route path="/suggestion" element={<Suggestion />}/>
        <Route path="/trend-analysis" element={<TrendAnalysis />}/>
        <Route path="/" element={<Homepage />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
