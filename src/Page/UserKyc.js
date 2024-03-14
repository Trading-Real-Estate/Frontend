import React, { useState } from 'react';


import {  Layout, Form, Input, Button, DatePicker, Upload } from 'antd';
//import { useNavigate } from 'react-router-dom';
import AppHeader from '../Components/Header/Header';
import AppFooter from '../Components/Footer/Footer';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { UploadOutlined } from '@ant-design/icons';

import '../Page/UserKyc.css';

const { useForm } = Form;
 //const UserKyc = () => {
//   const navigate = useNavigate();

//   const handleBackToHome = () => {
//     navigate('/');
//   };
function UserKyc(){  
  const [activeSection, setActiveSection] = useState(1);

  const navigationItems = [
    { id: 1, label: 'Cập nhật thông tin' },
    { id: 2, label: 'CMNG/CCCD' },
    { id: 3, label: 'Xác thực Email' },
    
    // Add other sections as necessary
  ];

  const handleNavigationClick = (id) => {
    setActiveSection(id);
  };
  return (
    <SimpleBar autoHide={false} style={{ overflow: 'auto' }}>
   <Layout className='user-info'>
   <AppHeader isHome={false}/>
       <Layout>
            <div className='updatr-info' style={{ padding: '100px 10px 100px 20px ' }}>
              {/* <h2>Trang User KYC</h2>
              <p>Đây là trang để người dùng thực hiện xác minh KYC .</p>
              <Button onClick={handleBackToHome}>Trở về trang chủ</Button> */}
              <NavigationMenu items={navigationItems} activeSection={activeSection} onNavigate={handleNavigationClick} />
              <ContentArea activeSection={activeSection} />
              <Footer activeSection={activeSection} onNavigate={handleNavigationClick} />
            </div>
       </Layout>
      
       
   </Layout>
   </SimpleBar>
  );
  function NavigationMenu({ items, activeSection, onNavigate }) {
    return (
      <nav className="Navigation-menu">
        {items.map((item) => (
          <div key={item.id} className={`Navigation-item ${activeSection === item.id ? 'active' : ''}`} onClick={() => onNavigate(item.id)}>
            <span className="circle">{activeSection === item.id ? '✓' : item.id}</span> - {item.label}
          </div>
        ))}
      </nav>
    );
  }
  
  function ContentArea({ activeSection }) {
    switch (activeSection) {
      case 1:
        return <Updateinformation />;
      case 2:
        return <IdCard />;
      case 3:
        return <Emailcode />;
      
      default:
        return <div>Select a section</div>;
    }
  }
  
  function Updateinformation() {
    // 2 dòng để lưu dữ liệu tạm thời vô local Storage
    const onFinish = (values) => { // Thêm dòng này
      localStorage.setItem('userInfo', JSON.stringify(values)); // Thêm dòng này
    }; // Thêm dòng này
    
    return( 
      <main className="Uppdate-information">
      <div style={{ padding: '0 50px' }}>
      <Form layout="vertical" style={{ margin: '100px auto', maxWidth: '600px' }}onFinish={onFinish}>
        <Form.Item label="Tên đầy đủ" name="fullname" rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ của bạn!' }]}>
          <Input />
        </Form.Item>
 
        {/* Thêm trường ID Card */}
        <Form.Item 
            label="Số CMND/CDCD" 
            name="idcard" 
            rules={[{ required: true, message: 'Vui lòng nhập số CMND/CDCD!' }]}
          >
            <Input />
          </Form.Item>
          
          {/* Thêm trường Ngày Sinh */}
          <Form.Item 
            label="Ngày sinh" 
            name="birthdate" 
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          {/* Thêm trường Quê quán */}
          <Form.Item 
            label="Nguyên quán" 
            name="hometown" 
            rules={[{ required: true, message: 'Vui lòng nhập Nguyên quán!' }]}
          >
            <Input />
          </Form.Item>
          
          {/* Thêm trường Nơi ở */}
          <Form.Item 
            label="Nơi DKHK thường trú" 
            name="currentResidence" 
            rules={[{ required: true, message: 'Vui lòng nhập nơi DKHK thường trú!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit">Lưu thông tin</Button>
        </Form.Item>
      </Form>
    </div>
    </main>
    );
  }
  
  function IdCard() {
    // 2 dòng để lưu dữ liệu tạm thời vô local Storage
    const onFinish = (values) => { // Thêm dòng này
      localStorage.setItem('userInfo', JSON.stringify(values)); // Thêm dòng này
    }; // Thêm dòng này
    const [form] = useForm(); // Step 2: Create form instance
  
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
  
    return (
      <main className="Id-card">
        <div style={{ padding: '0 50px' }}>
        <div>
          <label>CMND/CDCD:</label>
        </div>
          <Form 
            layout="vertical" 
            style={{ margin: '100px auto', maxWidth: '600px' }} 
            form={form} // Step 3: Pass form instance to the Form component
            onFinish={onFinish}
          >
            {/* Field for uploading front side of ID card */}
            <Form.Item
              label="Ảnh mặt trước của ID Card"
              name="idCardFront"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Vui lòng tải ảnh mặt trước của ID Card!' }]}
            >
              <Upload name="idCardFront" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
  
            {/* Field for uploading back side of ID card */}
            <Form.Item
              label="Ảnh mặt sau của ID Card"
              name="idCardBack"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Vui lòng tải ảnh mặt sau của ID Card!' }]}
            >
              <Upload name="idCardBack" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
  
            {/* Submit button */}
            <Form.Item>
              <Button type="primary" htmlType="submit">Lưu thông tin</Button>
            </Form.Item>
  
            {/* Reset button to clear form */}
            <Form.Item>
              <Button  
                htmlType="button" type="primary" danger
                onClick={() => {
                  form.resetFields(); // Step 4: Use form instance to reset fields
                }}
              >
                Xóa thông tin
              </Button>
            </Form.Item>
          </Form>
        </div>
      </main>
    );
  }
  
  function Emailcode() {
    // 2 dòng để lưu dữ liệu tạm thời vô local Storage
    const onFinish = (values) => { // Thêm dòng này
      localStorage.setItem('userInfo', JSON.stringify(values)); // Thêm dòng này
    }; // Thêm dòng này
    return( 
      <main className="Emailcode">
      <div style={{ padding: '0 50px' }}>
      <Form layout="vertical" style={{ margin: '100px auto', maxWidth: '600px' }}onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true, message: 'Vui lòng nhập email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit"danger>Gửi mã xác thực</Button>
        </Form.Item>     
          {/* Field for Email Code */}
          <Form.Item 
              label="Mã Xác Minh Email" 
              name="emailCode" 
              rules={[{ required: true, message: 'Vui lòng nhập mã xác minh từ email của bạn!' }]}
          >
            <Input placeholder="Nhập mã xác minh" />
          </Form.Item>
          <Form.Item>
          <Button type="primary"  htmlType="submit" >Lưu thông tin   </Button>
        </Form.Item>
      </Form>
    </div>
    </main>
    );
  }
  
  
  function Footer({ activeSection, onNavigate }) {
    const navigatePrevious = () => {
      if (activeSection > 1) {
        onNavigate(activeSection - 1);
      }
    };
  
    const navigateNext = () => {
      if (activeSection < 3) { // Assuming you have 8 sections
        onNavigate(activeSection + 1);
      }
    };
  
    return (
      <>
      <footer className="App-footer">
        <button className="Previous Button" onClick={navigatePrevious}>Quay lại</button>
        <button className="Next Button" onClick={navigateNext}>Tiếp theo</button>
      </footer>
      <AppFooter style={{ position: 'fixed', bottom: '0', left: '0', right: '0', width: '100%' }}/>

    </>
    );
  }
  
}

export default UserKyc;