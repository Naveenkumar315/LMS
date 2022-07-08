import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Login from './components/js/Login/Login';
import Home from './components/js/Home/Home';
import Lms from './components/js/LMS/LMS';
import Profile from './components/js/Profile/Profile';
import Sidebar from './components/Sub-Component/Sidebar';
import '../src/components/css/style.css';
import EnterTimeSheet from './components/js/TimeSheet/EnterTimeSheet';
function App() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/LMS' element={<Lms />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/EnterTimeSheet' element={<EnterTimeSheet />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
