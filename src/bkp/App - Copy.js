import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Login from './components/js/Login/Login';
import Home from './components/js/Home/Home';
import Lms from './components/js/LMS/LMS';
import Profile from './components/js/Profile/Profile';
import Sidebar from './components/Sub-Component/Sidebar';
import '../src/components/css/style.css';
// import EnterTimeSheet from './components/js/EnterTimeSheet';
function App() {
  return (
    <>
      <BrowserRouter>
        <div style={{ height: '100%' }}>
          <div style={{ backgroundColor: localStorage['BgColor'], color: '#fff', width: '100%', textAlign: 'center', padding: '10px' }}><h2 style={{ margin: 0 }}>Analytic Brains</h2></div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Sidebar />
            <div style={{ margin: '20px 30px', width: '100%', height: '85vh' }}>
              <Routes>
                <Route exact path='/' element={<Login />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/LMS' element={<Lms />} />
                <Route path='/Profile' element={<Profile />} />
                {/* <Route path='/EnterTimeSheet' element={<EnterTimeSheet />} /> */}
              </Routes>
            </div>
          </div>
        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
