// ConnectMetamaskButton.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'antd';
import { ethers } from "ethers";
import axios from 'axios';

const API_URL = '/api/getMessageLogin';

function ConnectMetamaskButton({ onLogin }) {
  const [connected, setConnected] = useState(false);
  const [signatureRequestVisible, setSignatureRequestVisible] = useState(false);
  const [signatureMessage, setSignatureMessage] = useState('');
  const [signatureResult, setSignatureResult] = useState('');
  const [nonce, setNonce] = useState(null);

  useEffect(() => {
    async function fetchNonce() {
      try {
        const { data } = await axios.post(API_URL, { address: '' });
        setNonce(data.nonce);
      } catch (error) {
        console.error('Failed to fetch nonce:', error);
      }
    }
    fetchNonce();
  }, []);

  // Function to handle connecting to Metamask and signing a message
  const connectAndSign = async () => {
    if (window.ethereum ) {
      try {
        // Requesting access to user accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];

        const provider = new ethers.BrowserProvider(window.ethereum);
        // Get the signer
        const signer = await provider.getSigner();

        // Generate the login message using nonce
        const message = `Login nonce: ${nonce}`;

        // Sign the message
        const signature = await signer.signMessage(message);

        // Call the onLogin callback with the address and signature
        if (onLogin) {
          onLogin(address, signature, message);
        }

        // Set connected state to true
        setConnected(true);
        console.log('Connected to Metamask and signed message:', message);
      } catch (error) {
        console.error('Failed to connect to Metamask:', error);
      }
    } else {
      console.error('Metamask is not available or nonce is not fetched');
    }
  };

  // Function to handle signature request
  const handleSignatureRequest = () => {
    setSignatureRequestVisible(true);
  };

  // Function to handle sending signature request
  const handleSendSignatureRequest = async () => {
    if (signatureMessage.trim() !== '') {
      try {
        // Requesting access to user accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(signatureMessage);
        setSignatureResult(signature);
      } catch (error) {
        console.error('Failed to request signature:', error);
      }
    }
  };

  return (
    <div>
      {/* Hiển thị nút đăng nhập hoặc thông báo đã kết nối */}
      {!connected ? (
        <Button type="text" onClick={connectAndSign} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}>Đăng nhập</Button>
      ) : (
        <div>
          <Button onClick={handleSignatureRequest}>Yêu cầu chữ ký</Button>
          <p>Connected to Metamask and signed message!</p>
        </div>
      )}
      {/* Hiển thị modal yêu cầu chữ ký */}
      <Modal
        title="Yêu cầu chữ ký"
        visible={signatureRequestVisible}
        onCancel={() => setSignatureRequestVisible(false)}
        footer={null}
      >
        <Input.TextArea
          placeholder="Nhập thông điệp cần ký"
          value={signatureMessage}
          onChange={(e) => setSignatureMessage(e.target.value)}
        />
        <Button type="primary" onClick={handleSendSignatureRequest}>Gửi yêu cầu</Button>
        <p>Chữ ký: {signatureResult}</p>
      </Modal>
    </div>
  );
}


export default ConnectMetamaskButton;
