# Magic 8 Ball App

A mystical Magic 8 Ball application built with Next.js, featuring NFT minting on Base network and Farcaster integration.

## Features

- 🔮 **Interactive Magic 8 Ball**: Ask questions and get mystical answers
- 🎨 **Beautiful UI**: Modern, responsive design with animations
- 📱 **Farcaster Integration**: Share results directly to Farcaster
- 🖼️ **Image Generation**: Generate beautiful result images
- 🪙 **NFT Minting**: Mint your Magic 8 Ball consultations as NFTs on Base
- 💰 **Minting Fee**: 0.01 ETH fee for NFT creation
- 💎 **Wallet Integration**: Connect with Farcaster Frame wallet
- 🌐 **Base Network**: Built for Base L2 network
- ☁️ **Vercel Blob Storage**: Secure image and metadata storage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Base network wallet (for NFT minting)
- Vercel account with BLOB_READ_WRITE_TOKEN

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd magic-8-ball
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## NFT Minting

### How it Works

1. **Ask a Question**: Type your question in the input field
2. **Shake the Ball**: Click the Magic 8 Ball to get your answer
3. **Connect Wallet**: Connect your wallet to mint NFTs
4. **Pay Fee**: Confirm the 0.01 ETH minting fee
5. **Mint NFT**: Click "Mint NFT" to create a permanent record of your consultation

### NFT Features

- **Unique Metadata**: Each NFT includes your question, answer, and consultation date
- **Generated Image**: Beautiful artwork featuring your Magic 8 Ball result
- **On-Chain Storage**: All data stored securely on Base network
- **ERC-721 Standard**: Compatible with all major NFT marketplaces
- **Vercel Blob Storage**: Fast, reliable image and metadata hosting

### Minting Fee

- **Cost**: 0.01 ETH per NFT
- **Purpose**: Covers gas costs and supports project development
- **Collection**: Fees are collected by the contract owner
- **Transparency**: Fee is clearly displayed before minting

### Contract Deployment

To deploy the NFT contract to Base network:

1. Navigate to the contracts directory:
```bash
cd contracts
```

2. Follow the deployment instructions in `contracts/README.md`

3. Update the contract address in `src/utils/nftContract.ts`

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Wagmi, Viem, Base Network
- **Wallet**: Farcaster Frame Connector
- **NFT**: ERC-721 Smart Contract with minting fees
- **Storage**: Vercel Blob (for metadata and images)
- **Social**: Farcaster SDK

## Project Structure

```
magic-8-ball/
├── src/
│   ├── app/                 # Next.js app directory
│   │   └── api/             # API routes
│   │       └── upload/      # Vercel Blob upload endpoint
│   ├── components/          # React components
│   │   ├── Magic8Ball.tsx   # Main Magic 8 Ball component
│   │   └── Magic8BallUI.tsx # UI component
│   ├── hooks/               # Custom React hooks
│   │   └── useMintNFT.ts    # NFT minting hook
│   ├── lib/                 # Library configurations
│   │   └── wagmi.ts         # Wagmi configuration
│   └── utils/               # Utility functions
│       ├── magic8Utils.js   # Magic 8 Ball utilities
│       ├── nftContract.ts   # NFT contract interface
│       └── vercelBlob.ts    # Vercel Blob utilities
├── contracts/               # Smart contracts
│   ├── Magic8BallNFT.sol    # NFT contract with fees
│   └── README.md            # Contract deployment guide
└── public/                  # Static assets
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here

# Optional: Contract address (after deployment)
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue on GitHub.

---

✨ May the mystical forces guide your development journey! 🔮
