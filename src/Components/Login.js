import React, { useState } from 'react';
import { Button } from 'antd';

function ConnectMetamaskButton({onLogin}) {
  const [connected, setConnected] = useState(false);

  // Function to handle connecting to Metamask
  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        // Requesting access to user accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Setting connected state to true
        setConnected(true);
        console.log('Connected to Metamask!');
        if (onLogin){
            onLogin();
        }
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
        <Button type="text" onClick={connectToMetamask} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}>Đăng nhập</Button>
      ) : (
        <p>Connected to Metamask!</p>
      )}
    </div>
  );
}

export default ConnectMetamaskButton;
