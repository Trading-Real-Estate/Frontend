import React from 'react';
import './EmailSubscription.css'; // Import CSS file for styling

const EmailSubscription = () => {

    const backgroundImageUrl = 'email.jpg';
    return (
        <div className="email-subscription" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <h2 style={{ color: 'white' }}>Nhận thông tin nhà đất miễn phí</h2>
            <p style={{ color: 'white' }}>Cập nhật hơn 1.000.000 thông tin mua bán và giao dịch nhà đất mỗi tháng tại 63 tỉnh thành phố trên cả nước</p>
            <div className="email-input">
                <input type="email" placeholder="Nhập email của bạn" />
                <button>Nhận tin miễn phí</button>
            </div>
        </div>
    );
};

export default EmailSubscription;
