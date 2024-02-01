import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalPrice from './components/TotalPrice';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';

export default function App() {
  
  return (
    <Provider store={store}>
  <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
      </Routes>
   </Router>
   </Provider>
  );
}
