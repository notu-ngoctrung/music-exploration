import { useState } from 'react';
import './App.css';
// import "react-animated-term/dist/react-animated-term.css";
import Homepage from './pages/Homepage';
import Suggestion from './pages/Suggestion';
import TrendAnalysis from './pages/TrendAnalysis';
import TrendNetwork from './pages/TrendNetwork';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/suggestion" element={<Suggestion />}/>
        <Route path="/trend-analysis" element={<TrendAnalysis />}/>
        <Route path="/trend-network" element={<TrendNetwork />}/>
        <Route path="/" element={<Homepage />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
