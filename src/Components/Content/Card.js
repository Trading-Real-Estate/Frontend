import React from 'react';
import { Card, Avatar } from 'antd';
import { HomeOutlined, DollarCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CustomCard = ({ item }) => {
    return (
        <Card
            hoverable
            style={{ width: 320, height: 450 }}
            cover={<img alt={item.name} src={item.imageUrl} style={{ width: 320, height: 210, marginTop: 1 }} />}
        >
            <div style={{ height: 240 }}>
                <Meta
                    title={item.name}
                    description={item.description}
                />
                <div style={{ marginTop: '30px' }}>
                    <Avatar size="small" icon={<EnvironmentOutlined />} />
                    <span style={{ marginLeft: '5px' }}> địa điểm{item.address}</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Avatar size="small" icon={<HomeOutlined />} />
                    <span style={{ marginLeft: '5px' }}> loại BDS</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Avatar size="small" icon={<DollarCircleOutlined />} />
                    <span style={{ marginLeft: '5px' }}> giá {item.price}</span>
                </div>
            </div>
        </Card>
    );
};

export default CustomCard;
