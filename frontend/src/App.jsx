import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Home from './pages/Home/Home';
import Results from './pages/Results/Results';
import './styles/_main.scss';

const App = () => {
  const responseData = useSelector(state => state.responseData);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {responseData.aggregateCategoryCost && <Route path="/results" element={<Results />} />}
        {!responseData.aggregateCategoryCost && (
          <Route path="/results" element={<Navigate replace to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
