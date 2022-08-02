import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from './components/Loader';
import Home from './pages/Home/Home';
import Result from './pages/Result/Result';
import Login from './pages/Login/Login';
import './App.css';
import './styles/_main.scss';

const App = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn) || localStorage.getItem('tokenId');

  return (
    <React.Suspense fallback={<Loader />}>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          {isLoggedIn && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/result" element={<Result />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </React.Suspense>
  );
};

export default App;
