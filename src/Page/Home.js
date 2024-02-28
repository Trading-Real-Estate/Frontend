import React from 'react';
import ContentComponent from '../Components/Content/Content';
import EmailSubscription from '../Components/Content/email';
import { Layout } from 'antd';
import Background from '../Components/Content/open';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from '../Components/Header/Header';
import AppFooter from '../Components/Footer/Footer';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';


const { Sider } = Layout;

const Home = () => {
  return (
    <Router>
      <SimpleBar autoHide={false} style={{ overflow: 'auto' }}>
        <Layout className="layout">
          <AppHeader />
          <Background image={['slider_3.png']} />
          <Layout>
            <Sider width={120} style={{ background: '#fff' }}>
              {/* Sidebar bên trái */}
            </Sider>
            <ContentComponent />
            <Sider width={120} style={{ background: '#fff' }}>
              {/* Sidebar bên phải */}
            </Sider>
          </Layout>
          <EmailSubscription />
          <AppFooter />
        </Layout>
      </SimpleBar>
    </Router>
  );
}

export default Home;
