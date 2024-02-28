import React, { useState, useEffect } from 'react';
import { Layout, Button, Badge, Avatar, Dropdown, Menu } from 'antd';
import { BellOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import CustomSearch from './CustomSearch';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = ({ onSearch, hasUnreadNotification }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('normal');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('userRole');
    if (loggedIn === 'true' && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = () => {
    setUserRole('normal');
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', 'normal');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userRole');
  };

  const handleUserProfile = () => {
    // Redirect user to user profile page
    navigate('/user-profile');
  };

  const handleSwitchToNotary = () => {
    setUserRole('notary');
    localStorage.setItem('userRole', 'notary');
  };

  const handleMenuClick = (menu) => {
    // Handle menu item click
    console.log("Menu item clicked:", menu.key);
    if (menu.key === 'home') {
      window.location.href = '/'; // Refresh lại trang chủ
    } else if (menu.key === 'logout') {
      handleLogout(); // Xử lý đăng xuất khi click vào logout
    }
  };



  const handleLogoClick = () => {
    // Handle logo click
    window.location.href = '/';
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="home" onClick={handleMenuClick}>Trang chủ</Menu.Item>
      <Menu.Item key="about" onClick={handleMenuClick}>About us</Menu.Item>
      <Menu.Item key="search" onClick={handleMenuClick}>Tra cứu</Menu.Item>
      <Menu.Item key="post" onClick={handleMenuClick}>Đăng tin</Menu.Item>
    </Menu>
  );

  const menuItems = [
    <Menu.Item key="1" onClick={handleUserProfile}>Thông tin người dùng</Menu.Item>,
  ];

  if (userRole === 'notary') {
    menuItems.push(
      <Menu.Item key="2">Danh sách tài sản</Menu.Item>,
      <Menu.Item key="3">Quản lý bài đăng</Menu.Item>,
      <Menu.Item key="4">Quản lý người dùng</Menu.Item>,
      <Menu.Item key="5">Số hóa tài sản</Menu.Item>
    );
  } else {
    menuItems.push(
      <Menu.Item key="2">Danh sách tài sản</Menu.Item>
    );
  }

  menuItems.push(
    <Menu.Item key="logout" onClick={handleLogout}>Đăng xuất</Menu.Item>
  );

  return (
    <Header style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', width: '100%', zIndex: 1000 }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
        <img src="batdongsanlogosblack.png" alt="Logo" style={{ width: '200px', height: 'auto', marginRight: '20px', cursor: 'pointer' }} onClick={handleLogoClick} /> {/* Handle logo click */}
        <CustomSearch onSearch={onSearch} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Badge dot={hasUnreadNotification} style={{ marginRight: '20px' }}>
          <BellOutlined style={{ fontSize: '20px', marginRight: '20px' }} />
        </Badge>
        <Dropdown overlay={menu}
          placement="topRight"
          trigger={['hover']}
        >
          <Button type="text" icon={<MenuOutlined />} style={{ marginRight: '20px' }} />
        </Dropdown>
        {isLoggedIn ? (
          <Dropdown overlay={<Menu>{menuItems}</Menu>} trigger={['click']} >
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
              <span>{userRole === 'normal' ? 'Người dùng' : 'Notary'}</span>
            </div>
          </Dropdown>
        ) : (
          <Button type="text" onClick={handleLogin} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}>Đăng nhập</Button>
        )}
        <Button onClick={handleSwitchToNotary} style={{ marginLeft: '20px', marginRight: '30px' }}>Chuyển sang Notary</Button> {/* Nút này sẽ chuyển đổi sang trạng thái Notary */}
      </div>
    </Header>
  );
}

export default AppHeader;
