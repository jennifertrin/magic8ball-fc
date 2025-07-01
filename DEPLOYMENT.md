# Magic 8 Ball NFT Contract Deployment Guide

This guide will walk you through deploying the Magic 8 Ball NFT contract to Base network using Hardhat.

## Prerequisites

1. **Node.js and npm** installed
2. **A wallet** with some ETH on Base network
3. **BaseScan API key** (optional, for contract verification)

## Step 1: Install Dependencies

The Hardhat dependencies are already installed. If you need to reinstall:

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Your wallet private key (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# Base network RPC URLs
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# BaseScan API key (optional, for contract verification)
BASESCAN_API_KEY=your_basescan_api_key_here
```

⚠️ **Security Warning**: Never commit your `.env` file to version control!

## Step 3: Compile the Contract

```bash
npx hardhat compile
```

This will create the `artifacts` directory with the compiled contract.

## Step 4: Deploy to Base Sepolia (Testnet)

First, deploy to the testnet to ensure everything works:

```bash
npx hardhat run scripts/deploy.ts --network baseSepolia
```

Expected output:
```
🚀 Deploying Magic8BallNFT contract...
📝 Contract factory created
⏳ Waiting for deployment...
✅ Magic8BallNFT deployed successfully!
📍 Contract address: 0x...
🌐 Network: baseSepolia
📋 Deployment Summary:
========================
Contract: Magic8BallNFT
Address: 0x...
Network: baseSepolia
Minting Fee: 0.01 ETH
Owner: 0x...
Explorer: https://sepolia.basescan.org/address/0x...
🎉 Deployment complete! Update your frontend with the contract address:
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
```

## Step 5: Test the Contract

1. **Get test ETH**: Visit [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
2. **Test minting**: Use the contract address in your app to test minting
3. **Verify functionality**: Check that fees are collected and NFTs are minted

## Step 6: Deploy to Base Mainnet

Once you're satisfied with the testnet deployment:

```bash
npx hardhat run scripts/deploy.ts --network base
```

## Step 7: Verify Contract on BaseScan

After deployment, verify your contract on BaseScan:

1. Go to [BaseScan](https://basescan.org) (or [Base Sepolia](https://sepolia.basescan.org) for testnet)
2. Search for your contract address
3. Click "Contract" tab
4. Click "Verify and Publish"
5. Select "Solidity (Single file)"
6. Enter compiler version: `0.8.20`
7. Upload the contract source code from `contracts/Magic8BallNFT.sol`

## Step 8: Update Your Frontend

Update the contract address in your frontend:

```typescript
// src/utils/nftContract.ts
export const NFT_CONTRACT_ADDRESS = '0x...'; // Your deployed address
```

Or set it as an environment variable:

```env
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
```

## Contract Functions

### Public Functions
- `mint(address to, string tokenURI, string question, string answer)` - Mint NFT (requires 0.01 ETH)
- `getMintingFee()` - Get current minting fee
- `tokenURI(uint256 tokenId)` - Get metadata URI
- `getQuestion(uint256 tokenId)` - Get question for token
- `getAnswer(uint256 tokenId)` - Get answer for token
- `totalSupply()` - Get total minted tokens

### Owner Functions
- `setMintingFee(uint256 newFee)` - Update minting fee
- `withdrawFees()` - Withdraw collected fees
- `transferOwnership(address newOwner)` - Transfer contract ownership

## Gas Estimation

Estimated gas costs for Base network:
- **Contract Deployment**: ~2,000,000 gas (~0.02 ETH)
- **NFT Minting**: ~150,000 gas (~0.0015 ETH)
- **Fee Withdrawal**: ~50,000 gas (~0.0005 ETH)

## Troubleshooting

### Common Issues

1. **Insufficient Balance**
   ```
   Error: insufficient funds for gas * price + value
   ```
   Solution: Add more ETH to your wallet

2. **Network Connection**
   ```
   Error: network does not support ENS
   ```
   Solution: Check your RPC URL in `.env`

3. **Contract Verification**
   ```
   Error: Already Verified
   ```
   Solution: Contract is already verified, no action needed

### Getting Help

- Check [Base Documentation](https://docs.base.org/)
- Visit [Base Discord](https://discord.gg/base)
- Review [Hardhat Documentation](https://hardhat.org/docs)

## Security Checklist

- [ ] Private key is secure and not committed to git
- [ ] Contract is deployed to testnet first
- [ ] Contract is verified on BaseScan
- [ ] Minting fee is set correctly (0.01 ETH)
- [ ] Owner functions are tested
- [ ] Frontend is updated with correct contract address

## Next Steps

After successful deployment:

1. **Test the full flow** in your app
2. **Monitor transactions** on BaseScan
3. **Set up monitoring** for contract events
4. **Consider upgrading** the contract if needed
5. **Document the deployment** for your team

---

🎉 **Congratulations!** Your Magic 8 Ball NFT contract is now live on Base network! 