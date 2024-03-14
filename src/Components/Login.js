import React, { useState } from 'react';
import { Button } from 'antd';
import { ethers } from "ethers";


function ConnectMetamaskButton({ onLogin }) {
  const [connected, setConnected] = useState(false);

  // Function to handle connecting to Metamask and signing a message
  const connectAndSign = async () => {
    if (window.ethereum) {
      try {
        // Requesting access to user accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        
        // Create a provider
        const { providers } = ethers;
        const provider = new providers.BrowserProvider(window.ethereum);
        // Get the signer
        const signer = provider.getSigner();
        
        // Message to sign
        const nonce = Math.floor(Math.random() * 1000000); // Generate a random nonce
        const message = `Welcome to XYZ, please sign this message to authenticate: ${nonce}`;
        
        // Sign the message
        const signature = await signer.signMessage(message);
        
        // Call the onLogin callback with the address and signature
        if (onLogin) {
          onLogin(address, signature);
        }
        
        // Set connected state to true
        setConnected(true);
        console.log('Connected to Metamask and signed message:', message);
      } catch (error) {
        console.error('Failed to connect to Metamask:', error);
      } 
    } else {
      console.error('Metamask is not available');
    }
  };

  return (
    <div>
      {!connected ? (
        <Button type="text" onClick={connectAndSign} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}>Đăng nhập</Button>
      ) : (
        <p>Connected to Metamask and signed message!</p>
      )}
    </div>
  );
}

export default ConnectMetamaskButton;