import React, { useState } from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

//const root = ReactDOM.createRoot(document.getElementById('root'));
const root = createRoot(document.getElementById('root'));

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        </Routes>
      </Router>
    );
  }

  return <App />;
}

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

reportWebVitals();