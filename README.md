SeedShield Documentation
A Secure Seed Phrase Manager for Web3

1. PROJECT OVERVIEW
   Purpose: Protect cryptocurrency seed phrases by splitting them into encrypted fragments using Shamir's Secret Sharing algorithm.
   Key Features:

🔒 Split 12/24-word seed phrases into multiple fragments

🔑 Require only a subset (e.g., 3-of-5) to recover the original

🌐 Non-custodial - all processing happens locally

🦊 MetaMask integration for wallet connection

2. Technical Stack
   Component |Technology
   Frontend |React.js
   Smart Contracts |Solidity (Hardhat)
   Encryption |Shamir's Secret Sharing (shamir-secret-sharing lib)
   Wallet Connect |ethers.js
   UI Framework |CSS-in-JS

3. Setup Instructions
   Prerequisites
   Node.js (v18+)
   MetaMask browser extension
   Git (optional)

->INSTALLATION

git clone https://github.com/your-repo/seedshield.git
cd seedshield
npm install

->ENVIRONMENT CONFIGURATION
Create .env file:
env
REACT_APP_INFURA_KEY=your_infura_key # For mainnet/testnet access

4. KEY COMPONENTS

A. Smart Contract (SeedShield.sol)
solidity
// Stores encrypted fragments on-chain
pragma solidity ^0.8.24;

contract SeedShield {
mapping(address => string[]) private userFragments;

    function storeFragment(string memory fragment) external {
        userFragments[msg.sender].push(fragment);
    }

    function getFragments() external view returns (string[] memory) {
        return userFragments[msg.sender];
    }

}

B. Core Functions
Seed Splitting (App.js)
javascript
const handleSplit = async (seed) => {
const encoder = new TextEncoder();
const secret = encoder.encode(seed);
const shares = await split(secret, 5, 3); // 5 fragments, 3 needed

// Convert to hex for display
setFragments(shares.map(share =>
bufferToHex(share)
));
};
Wallet Connection
javascript
const connectWallet = async () => {
if (window.ethereum) {
const provider = new ethers.BrowserProvider(window.ethereum);
const accounts = await provider.send("eth_requestAccounts", []);
setAccount(accounts[0]);
}
};

5. WORKFLOW DIAGRAM
   ->text
   User Input → [Seed Phrase] → Split into Fragments → (Optional: Store on-chain)  
   Recovery: 3+ Fragments → Combine → Original Seed

6. USAGE GUIDE

->Splitting a Seed Phrase
Connect your MetaMask wallet

Paste your 12/24-word seed phrase

Click "Split Seed"

Securely store the generated fragments

Recovering a Wallet
Enter at least 3 fragments

System combines them automatically

Original seed phrase is reconstructed

7. SECURITY CONSEDARATION

🚫 Never store all fragments in one location

🔥 Fragments are useless individually

🌐 On-chain storage is encrypted

⚠️ Always test with dummy seeds first

8. DEPLOYMENT
   ->Local Development
   bash
   npx hardhat node # Start local blockchain
   npm start # Launch frontend
   Production Build
   bash
   npm run build
   firebase deploy # Example deployment

9. TESTING
   ->Run unit tests:

bash
npx hardhat test
Test cases include:

Seed splitting/recovery accuracy

Wallet connection

Fragment validation
"# SeedSheild" 
