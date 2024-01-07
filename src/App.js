// import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";


const App = () => {

  const pageSize = 15;
  const apiKey = process.env.REACT_APP_NEWS_API;

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={pageSize} apiKey={apiKey} country='in' category="general" />} />
          <Route exact path="/business" element={<News key="business" pageSize={pageSize} apiKey={apiKey} country='in' category='business' />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} apiKey={apiKey} country='in' category='entertainment' />} />
          <Route exact path="/general" element={<News key="general" pageSize={pageSize} apiKey={apiKey} country='in' category='general' />} />
          <Route exact path="/health" element={<News key="health" pageSize={pageSize} apiKey={apiKey} country='in' category='health' />} />
          <Route exact path="/science" element={<News key="science" pageSize={pageSize} apiKey={apiKey} country='in' category='science' />} />
          <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} apiKey={apiKey} country='in' category='sports' />} />
          <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} apiKey={apiKey} country='in' category='technology' />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;

