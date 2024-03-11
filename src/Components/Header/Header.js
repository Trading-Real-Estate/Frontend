import React, { useState, useEffect } from 'react';
import { Layout, Button, Badge, Avatar, Dropdown, Menu } from 'antd';
import { BellOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import CustomSearch from './CustomSearch';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = ({ onSearch, isHome }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('normal');
  // Thêm trạng thái mới để theo dõi thông báo chưa đọc+
  const [hasUnreadNotification,setHasUnreadNotification ] = useState(false);
  //+
  // Thêm state để quản lý màu của Badge thông báo++
const [notificationColor, setNotificationColor] = useState(''); // Mặc định là rỗng++
  const navigate = useNavigate();

  useEffect(() => {
    // Cập nhật useEffect để đặt màu thông báo là đỏ khi vào trang User Profile++
    const path = window.location.pathname;
  if (path === '/user-profile') {
    setNotificationColor('red'); // Đặt màu thông báo là đỏ
  }//++
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


  // const handleUserProfileClick = () => {
  //   // Kiểm tra điều kiện cho người dùng có vai trò 'normal'
  //   if (userRole === 'normal' && isHome) {
  //     // Điều kiện để ở trang Home và không chuyển hướng
  //     setHasUnreadNotification(true); // Đánh dấu thông báo là chưa đọc
  //   } else if (userRole === 'notary' || !isHome) {
  //     // Điều kiện cho người dùng với vai trò 'notary' hoặc không ở trang Home
  //     navigate('/user-info'); // Điều hướng đến trang UserInfo
  //   }
    
  // };
  const handleUserProfileClick = () => {
    const path = window.location.pathname;
    if (userRole === 'normal' && isHome) {
      // Logic hiện tại cho người dùng bình thường ở trang Home
      setHasUnreadNotification(true);
    } else if (userRole === 'notary' || !isHome) {
      // Điều hướng đến UserInfo cho người dùng Notary hoặc khi không ở trang Home
      navigate('/user-info');
    } else if (!isHome && path === '/user-profile') {
      // Đoạn mới thêm: Logic đặc biệt cho trang UserKyc
      setHasUnreadNotification(true); // Đánh dấu thông báo khi ở trang UserKyc
    }
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
// Hiển thị message khi click vào thông báo++
const handleNotificationClick = () => {
  const path = window.location.pathname;
  if (isHome) { // Kiểm tra xem Header có đang được sử dụng trong Home.js không
    
  alert('Bạn phải UserKyc thì mới thực hiện được chức năng này. Bấm vào đây để bắt đầu thực hiện UserKyc');
  navigate('/user-profile'); // Điều hướng người dùng tới trang UserKyc
  setHasUnreadNotification(false); // Reset trạng thái thông báo về đã đọc sau khi click
  setNotificationColor(''); // Reset màu thông báo
   }  else if (path === '/user-profile') {
     // Đoạn mới thêm: Hiển thị thông báo khi ở trang UserKyc và thông báo được click
     alert('Bạn phải hoàn thành UserKyc');
     setHasUnreadNotification(false); // Reset trạng thái thông báo về đã đọc
     setNotificationColor(''); // Reset màu thông báo
  }
};
//++

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
    <Menu.Item key="1" onClick={handleUserProfileClick}>Thông tin người dùng</Menu.Item>,
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
      
      <Badge dot={hasUnreadNotification} style={{ backgroundColor: notificationColor, marginRight: '20px' }} onClick={handleNotificationClick}>
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
