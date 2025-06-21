import { useState } from 'react';
import { split } from 'shamir-secret-sharing';
import { Buffer } from 'buffer';

function App() {
  const [account, setAccount] = useState(null);
  const [fragments, setFragments] = useState([]);

const handleSplit = async (seed) => {
  try {
    const encoder = new TextEncoder();
    const secret = encoder.encode(seed);
    const shares = await split(secret, 5, 3);
    
    // Convert shares to hex strings using Buffer
    setFragments(shares.map(share => 
      Buffer.from(share).toString('hex')
    ));
  } catch (error) {
    console.error('Error splitting seed:', error);
    alert('Error processing seed phrase');
  }
};
  window.Buffer = Buffer;
const randomBytes = (length) => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return array;
};
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SeedShield</h1>
      {!account ? (
        <button 
          onClick={connectWallet}
          style={{ padding: '10px 15px', background: '#4CAF50', color: 'white' }}
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
          
          <div style={{ marginTop: '20px' }}>
            <h3>Enter Seed Phrase</h3>
            <textarea 
              id="seedInput"
              style={{ width: '100%', height: '100px', padding: '8px' }}
              placeholder="Enter your 12 or 24 word seed phrase"
            />
            <button 
              onClick={() => handleSplit(document.getElementById('seedInput').value)}
              style={{ marginTop: '10px', padding: '10px 15px', background: '#2196F3' }}
            >
              Split Seed
            </button>
          </div>

          {fragments.length > 0 && (
            <div style={{ marginTop: '30px' }}>
              <h3>Generated Fragments (3 needed to recover)</h3>
              {fragments.map((fragment, i) => (
                <div key={i} style={{ 
                  margin: '10px 0', 
                  padding: '10px', 
                  background: '#f5f5f5',
                  wordBreak: 'break-all'
                }}>
                  <strong>Fragment {i+1}:</strong> {fragment}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;