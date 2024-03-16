import React from 'react';
import './App.css';
import Home from './Page/Home';
import UserKyc from './Page/UserKyc';
import UserInfo from './Page/UserInfo'; // Đảm bảo đã import trang UserInfo một cách đúng đắn
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConnectMetamaskButton from './Components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/api/getLoginMessage' element={<ConnectMetamaskButton/>} />
        <Route path="/user-profile" element={<UserKyc />} />
        <Route path="/user-info" element={<UserInfo />} /> {/* Đảm bảo bạn đã thêm đường dẫn này */}
      </Routes>
    </Router>
  );
}

export default App;
