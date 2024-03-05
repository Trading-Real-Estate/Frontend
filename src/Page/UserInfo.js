import React, { useState, useEffect } from 'react';
import { Layout, Form, Input } from 'antd';
import AppHeader from '../Components/Header/Header';
import AppFooter from '../Components/Footer/Footer';
import EmailSubscription from '../Components/Content/email';
const { Content } = Layout;

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // Lấy dữ liệu người dùng từ Local Storage khi component được mount
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData) {
      setUserInfo(userData);
    }
  }, []);

  return (
    <Layout className='user-info-layout'>
      <AppHeader />
      <Content style={{ padding: '0 50px' }}>
        <Form layout="vertical" style={{ margin: '100px auto', maxWidth: '600px' }}>
          {/* Hiển thị thông tin người dùng từ state */}
          <Form.Item label="Tên đầy đủ">
            <Input value={userInfo.fullname || ''} disabled />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={userInfo.email || ''} disabled />
          </Form.Item>
          {/* Thêm các trường khác tương tự */}
          <Form.Item label="Số CMND/CCCD">
            <Input value={userInfo.idcard || ''} disabled />
          </Form.Item>
          <Form.Item label="Ngày sinh">
            <Input value={userInfo.birthdate || ''} disabled />
          </Form.Item>
          {/* Thêm các trường thông tin khác được lưu trong userInfo */}
        </Form>
      </Content>
      <EmailSubscription />
      <AppFooter />
    </Layout>
  );
};

export default UserInfo;

