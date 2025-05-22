export const MAGIC_8_BALL_NFT_ADDRESS = '0x...' // Replace with your deployed contract address

export const MAGIC_8_BALL_NFT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "question",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "answer",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imageURI",
        "type": "string"
      }
    ],
    "name": "mintPrediction",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
] as const; 