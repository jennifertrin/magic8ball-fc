# Quick Start: Deploy Magic 8 Ball NFT Contract

## 🚀 Fast Deployment (5 minutes)

### 1. Set up environment variables

Create `.env` file:
```env
PRIVATE_KEY=your_wallet_private_key_here
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

### 2. Compile the contract
```bash
npm run compile
```

### 3. Deploy to testnet first
```bash
npm run deploy:testnet
```

### 4. Test the contract
```bash
# Set your deployed contract address
export CONTRACT_ADDRESS=0x...
export NETWORK=baseSepolia

# Test the contract
npx hardhat run scripts/test-contract.js --network baseSepolia
```

### 5. Deploy to mainnet
```bash
npm run deploy:mainnet
```

### 6. Update your frontend
```typescript
// src/utils/nftContract.ts
export const NFT_CONTRACT_ADDRESS = '0x...'; // Your deployed address
```

## 📋 What You Get

✅ **ERC-721 NFT Contract** with 0.01 ETH minting fee  
✅ **Base Network** deployment  
✅ **Owner controls** for fee management  
✅ **Automatic verification** on BaseScan  
✅ **Test scripts** for validation  

## 🔧 Contract Features

- **Minting Fee**: 0.01 ETH per NFT
- **Metadata Storage**: Question, answer, and image URI
- **Owner Functions**: Fee management and withdrawals
- **Gas Optimized**: Efficient for Base network

## 📊 Expected Costs

- **Deployment**: ~0.02 ETH
- **Minting**: ~0.0015 ETH (gas) + 0.01 ETH (fee)
- **Total per NFT**: ~0.0115 ETH

## 🎯 Next Steps

1. **Test minting** in your app
2. **Monitor transactions** on BaseScan
3. **Set up fee collection** monitoring
4. **Consider contract upgrades** if needed

---

Need help? Check the full [DEPLOYMENT.md](./DEPLOYMENT.md) guide! 