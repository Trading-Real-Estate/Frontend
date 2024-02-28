import React from 'react';
import './Footer.css'; // Import CSS file for Footer styling

const AppFooter = () => {
    return (
        <footer className="footer">
          <div className="container">
            <div className="footer-row">
              <div className="footer-column">
                <h2>Contact Us</h2>
                <p>123 Street Name, City, Country</p>
                <p>Email: example@example.com</p>
                <p>Phone: 123-456-7890</p>
              </div>
              <div className="footer-column">
                <h2>Chủ Đầu Tư</h2>
                <img src="/path/to/logo.png" alt="Chủ Đầu Tư" />
              </div>
            </div>
          </div>
        </footer>
      );
    };

export default AppFooter;
