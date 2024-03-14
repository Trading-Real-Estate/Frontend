import React, { useState } from 'react';
import { Button } from 'antd';
import { ethers } from "ethers";

function ConnectMetamaskButton({ onLogin }) {
  const [connected, setConnected] = useState(false);

  const connectAndSign = async () => {
    if (window.ethereum) {
      try {
        // Ensure the user has given permission to access their accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the list of connected accounts
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        // Check if there are any connected accounts
        if (!accounts || accounts.length === 0) {
          throw new Error('No connected accounts found');
        }

        // Use the first connected account
        const address = accounts[0];
        
        // Create a provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        // Get the signer
        const signer = provider.getSigner();
        await provider.send("eth_requestAccounts", []);
        // Generate a random nonce
        const nonce = Math.floor(Math.random() * 1000000);
        
        // Create the message to sign
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
