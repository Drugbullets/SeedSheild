// import { useState } from 'react';
import { ethers } from 'ethers';

export default function WalletConnector({ onConnect }) {
  const connect = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      onConnect(await signer.getAddress());
    }
  };

  return <button onClick={connect}>Connect Wallet</button>;
}