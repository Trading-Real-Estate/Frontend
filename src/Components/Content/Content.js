import React from 'react';
import { Layout, Button } from 'antd';
import CustomCard from './Card'; // Import CustomCard component
import './Content.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const { Content } = Layout;

const items = [
  { id: 1, name: 'House 1',description: 'cha biet ghi gi', imageUrl: 'https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg' },
  { id: 3, name: 'House 3',description: 'cha biet ghi gi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmXD8uXEG2iRJmKa9VJV5bAfo8WcxQEkZeVyJXKXPklUeimzaFYfTPt6CISWwKdiswFIA&usqp=CAU' },
  { id: 2, name: 'House 2', description: 'cha biet ghi gi',imageUrl: 'https://www.realestate.com.au/news-image/w_2000,h_1500/v1690938439/news-lifestyle-content-assets/wp-content/production/Front-Elevation.png?_i=AA' },
  { id: 3, name: 'House 3', description: 'cha biet ghi gi',imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmXD8uXEG2iRJmKa9VJV5bAfo8WcxQEkZeVyJXKXPklUeimzaFYfTPt6CISWwKdiswFIA&usqp=CAU' },
  { id: 3, name: 'House 3', description: 'cha biet ghi gi',imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmXD8uXEG2iRJmKa9VJV5bAfo8WcxQEkZeVyJXKXPklUeimzaFYfTPt6CISWwKdiswFIA&usqp=CAU' },
];

const ContentComponent = () => {
  const slidesPerView = 3;

  return (
    <Content style={{ padding: '0 50px', overflow: 'hidden', position: 'relative', zIndex: 1, marginTop: '20px' }}>
      {/* Nội dung của bạn ở đây */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Dự án BDS nổi bật</h1>
          <Button type="text" style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}>Xem thêm</Button>
        </div>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          navigation={true}
          freeMode={true}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={slidesPerView}
          autoplay={{ delay: 3000, disableOnInteraction: false,}}
          style={{
            '--swiper-navigation-size': '30px'
          }}
        >
          {items.map(item => (
            <SwiperSlide className="swiperslider" key={item.id}>
              <CustomCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Dự án BDS mới nhất</h1>
          <Button type="text" style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}>Xem thêm</Button>
        </div>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          navigation={true}
          freeMode={true}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={slidesPerView}
          autoplay={{ delay: 3000, disableOnInteraction: false,}}
          style={{
            '--swiper-navigation-size': '30px'
          }}
        >
          {items.map(item => (
            <SwiperSlide className="swiperslider" key={item.id}>
              <CustomCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Dự án BDS xem nhiều</h1>
          <Button type="text" style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}>Xem thêm</Button>
        </div>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          navigation={true}
          freeMode={true}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={slidesPerView}
          autoplay={{ delay: 3000, disableOnInteraction: false,}}
          style={{
            '--swiper-navigation-size': '30px',
          }}
        >
          {items.map(item => (
            <SwiperSlide className="swiperslider" key={item.id}>
              <CustomCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Content>
  );
};

export default ContentComponent;
