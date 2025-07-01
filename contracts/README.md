# Magic 8 Ball NFT Contract

This directory contains the smart contract for minting Magic 8 Ball result NFTs on Base network.

## Contract Details

- **Name**: Magic 8 Ball Results
- **Symbol**: M8B
- **Network**: Base (L2)
- **Standard**: ERC-721
- **Minting Fee**: 0.01 ETH

## Deployment Instructions

### Prerequisites

1. Install Hardhat and dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts
```

2. Create a `.env` file in the root directory:
```env
PRIVATE_KEY=your_private_key_here
BASE_RPC_URL=https://mainnet.base.org
BASESCAN_API_KEY=your_basescan_api_key
```

### Deploy to Base Mainnet

1. Compile the contract:
```bash
npx hardhat compile
```

2. Deploy the contract:
```bash
npx hardhat run scripts/deploy.ts --network base
```

3. Update the contract address in `src/utils/nftContract.ts`:
```typescript
export const NFT_CONTRACT_ADDRESS = '0x...'; // Replace with deployed address
```

### Deploy to Base Sepolia (Testnet)

1. Deploy to testnet:
```bash
npx hardhat run scripts/deploy.ts --network baseSepolia
```

## Contract Functions

### Public Functions
- `mint(address to, string tokenURI, string question, string answer)` - Mint a new NFT (requires 0.01 ETH fee)
- `tokenURI(uint256 tokenId)` - Get the metadata URI for a token
- `getQuestion(uint256 tokenId)` - Get the question for a token
- `getAnswer(uint256 tokenId)` - Get the answer for a token
- `getTokenInfo(uint256 tokenId)` - Get all info for a token
- `totalSupply()` - Get the total number of minted tokens
- `getMintingFee()` - Get the current minting fee
- `mintingFee()` - Get the current minting fee (public variable)

### Owner Functions
- `setMintingFee(uint256 newFee)` - Update the minting fee (owner only)
- `withdrawFees()` - Withdraw accumulated fees (owner only)

## Minting Process

1. **User Interaction**: User asks a question to the Magic 8 Ball
2. **Image Generation**: App generates a beautiful image of the result
3. **Storage**: Image and metadata are uploaded to Vercel Blob
4. **Minting**: User pays 0.01 ETH fee and mints the NFT
5. **On-Chain Storage**: Question, answer, and metadata URI are stored on-chain

## Fee Structure

- **Minting Fee**: 0.01 ETH per NFT
- **Fee Collection**: Fees are collected by the contract owner
- **Fee Withdrawal**: Owner can withdraw accumulated fees
- **Fee Updates**: Owner can update the minting fee

## Integration

After deployment, the contract will be integrated with the Magic 8 Ball app to mint NFTs of consultation results. Users can:

1. Ask a question to the Magic 8 Ball
2. Get an answer
3. Pay the minting fee (0.01 ETH)
4. Mint an NFT with the question, answer, and generated image
5. View their NFT collection

## Security

- Minting requires payment of the specified fee
- Only the contract owner can update fees and withdraw funds
- All token data is stored on-chain
- Uses OpenZeppelin's battle-tested ERC-721 implementation
- Fees are collected securely in the contract

## Revenue Model

The 0.01 ETH minting fee provides:
- Gas cost coverage for NFT minting
- Project sustainability and development funding
- Incentive for quality NFT creation
- Revenue sharing potential for the project team 