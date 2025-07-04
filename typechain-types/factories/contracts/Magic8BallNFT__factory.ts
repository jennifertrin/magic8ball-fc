/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  Magic8BallNFT,
  Magic8BallNFTInterface,
} from "../../contracts/Magic8BallNFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FeesWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "Minted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "MintingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "mintingFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "setMintingFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405266071afd498d000060085560016009553480156200002157600080fd5b50336040518060400160405280601081526020016f135859da58c80e0810985b1b0813919560821b81525060405180604001604052806003815260200162269c2160e91b8152508160009081620000799190620001c3565b506001620000888282620001c3565b5050506001600160a01b038116620000ba57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000c581620000cc565b506200028f565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200014957607f821691505b6020821081036200016a57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001be57600081815260208120601f850160051c81016020861015620001995750805b601f850160051c820191505b81811015620001ba57828155600101620001a5565b5050505b505050565b81516001600160401b03811115620001df57620001df6200011e565b620001f781620001f0845462000134565b8462000170565b602080601f8311600181146200022f5760008415620002165750858301515b600019600386901b1c1916600185901b178555620001ba565b600085815260208120601f198616915b8281101562000260578886015182559484019460019091019084016200023f565b50858210156200027f5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b611780806200029f6000396000f3fe60806040526004361061012e5760003560e01c806370a08231116100ab578063a22cb4651161006f578063a22cb46514610322578063b88d4fde14610342578063c87b56dd14610362578063d85d3d2714610382578063e985e9c514610395578063f2fde38b146103b557600080fd5b806370a08231146102a4578063715018a6146102c457806375794a3c146102d95780638da5cb5b146102ef57806395d89b411461030d57600080fd5b806323b872dd116100f257806323b872dd1461020b57806342842e0e1461022b578063476343ee1461024b5780635a64ad95146102605780636352211e1461028457600080fd5b806301ffc9a71461013a57806306fdde031461016f578063081812fc14610191578063095ea7b3146101c9578063238a4709146101eb57600080fd5b3661013557005b600080fd5b34801561014657600080fd5b5061015a610155366004611264565b6103d5565b60405190151581526020015b60405180910390f35b34801561017b57600080fd5b50610184610400565b60405161016691906112d1565b34801561019d57600080fd5b506101b16101ac3660046112e4565b610492565b6040516001600160a01b039091168152602001610166565b3480156101d557600080fd5b506101e96101e4366004611319565b6104bb565b005b3480156101f757600080fd5b506101e96102063660046112e4565b6104ca565b34801561021757600080fd5b506101e9610226366004611343565b610518565b34801561023757600080fd5b506101e9610246366004611343565b6105a8565b34801561025757600080fd5b506101e96105c8565b34801561026c57600080fd5b5061027660085481565b604051908152602001610166565b34801561029057600080fd5b506101b161029f3660046112e4565b61070c565b3480156102b057600080fd5b506102766102bf36600461137f565b610717565b3480156102d057600080fd5b506101e961075f565b3480156102e557600080fd5b5061027660095481565b3480156102fb57600080fd5b506007546001600160a01b03166101b1565b34801561031957600080fd5b50610184610773565b34801561032e57600080fd5b506101e961033d36600461139a565b610782565b34801561034e57600080fd5b506101e961035d366004611462565b61078d565b34801561036e57600080fd5b5061018461037d3660046112e4565b6107a5565b6102766103903660046114de565b6108b6565b3480156103a157600080fd5b5061015a6103b0366004611527565b61097d565b3480156103c157600080fd5b506101e96103d036600461137f565b6109ab565b60006001600160e01b03198216632483248360e11b14806103fa57506103fa826109e9565b92915050565b60606000805461040f9061155a565b80601f016020809104026020016040519081016040528092919081815260200182805461043b9061155a565b80156104885780601f1061045d57610100808354040283529160200191610488565b820191906000526020600020905b81548152906001019060200180831161046b57829003601f168201915b5050505050905090565b600061049d82610a39565b506000828152600460205260409020546001600160a01b03166103fa565b6104c6828233610a72565b5050565b6104d2610a7f565b600880549082905560408051828152602081018490527fd9f6ef7693e010e9865df49a375af5d7ed9e7f23b735694e7f80232b824aa82d91015b60405180910390a15050565b6001600160a01b03821661054757604051633250574960e11b8152600060048201526024015b60405180910390fd5b6000610554838333610aac565b9050836001600160a01b0316816001600160a01b0316146105a2576040516364283d7b60e01b81526001600160a01b038086166004830152602482018490528216604482015260640161053e565b50505050565b6105c38383836040518060200160405280600081525061078d565b505050565b6105d0610a7f565b47806106145760405162461bcd60e51b81526020600482015260136024820152724e6f206665657320746f20776974686472617760681b604482015260640161053e565b60006106286007546001600160a01b031690565b6001600160a01b03168260405160006040518083038185875af1925050503d8060008114610672576040519150601f19603f3d011682016040523d82523d6000602084013e610677565b606091505b50509050806106ba5760405162461bcd60e51b815260206004820152600f60248201526e15da5d1a191c985dc819985a5b1959608a1b604482015260640161053e565b6007546001600160a01b03166001600160a01b03167fc0819c13be868895eb93e40eaceb96de976442fa1d404e5c55f14bb65a8c489a8360405161070091815260200190565b60405180910390a25050565b60006103fa82610a39565b60006001600160a01b038216610743576040516322718ad960e21b81526000600482015260240161053e565b506001600160a01b031660009081526003602052604090205490565b610767610a7f565b6107716000610ba5565b565b60606001805461040f9061155a565b6104c6338383610bf7565b610798848484610518565b6105a23385858585610c96565b60606107b082610a39565b50600082815260066020526040812080546107ca9061155a565b80601f01602080910402602001604051908101604052809291908181526020018280546107f69061155a565b80156108435780601f1061081857610100808354040283529160200191610843565b820191906000526020600020905b81548152906001019060200180831161082657829003601f168201915b50505050509050600061086160408051602081019091526000815290565b90508051600003610873575092915050565b8151156108a557808260405160200161088d929190611594565b60405160208183030381529060405292505050919050565b6108ae84610dc1565b949350505050565b600060085434101561090a5760405162461bcd60e51b815260206004820152601860248201527f496e73756666696369656e74206d696e74696e67206665650000000000000000604482015260640161053e565b600980546000918261091b836115c3565b91905055905061092b3382610e36565b6109358184610e50565b80336001600160a01b03167fe7cd4ce7f2a465edc730269a1305e8a48bad821e8fb7e152ec413829c01a53c48560405161096f91906112d1565b60405180910390a392915050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6109b3610a7f565b6001600160a01b0381166109dd57604051631e4fbdf760e01b81526000600482015260240161053e565b6109e681610ba5565b50565b60006001600160e01b031982166380ac58cd60e01b1480610a1a57506001600160e01b03198216635b5e139f60e01b145b806103fa57506301ffc9a760e01b6001600160e01b03198316146103fa565b6000818152600260205260408120546001600160a01b0316806103fa57604051637e27328960e01b81526004810184905260240161053e565b6105c38383836001610e99565b6007546001600160a01b031633146107715760405163118cdaa760e01b815233600482015260240161053e565b6000828152600260205260408120546001600160a01b0390811690831615610ad957610ad9818486610f9f565b6001600160a01b03811615610b1757610af6600085600080610e99565b6001600160a01b038116600090815260036020526040902080546000190190555b6001600160a01b03851615610b46576001600160a01b0385166000908152600360205260409020805460010190555b60008481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216610c2957604051630b61174360e31b81526001600160a01b038316600482015260240161053e565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b15610dba57604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290610cd89088908890879087906004016115ea565b6020604051808303816000875af1925050508015610d13575060408051601f3d908101601f19168201909252610d1091810190611627565b60015b610d7c573d808015610d41576040519150601f19603f3d011682016040523d82523d6000602084013e610d46565b606091505b508051600003610d7457604051633250574960e11b81526001600160a01b038516600482015260240161053e565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b14610db857604051633250574960e11b81526001600160a01b038516600482015260240161053e565b505b5050505050565b6060610dcc82610a39565b506000610de460408051602081019091526000815290565b90506000815111610e045760405180602001604052806000815250610e2f565b80610e0e84611003565b604051602001610e1f929190611594565b6040516020818303038152906040525b9392505050565b6104c6828260405180602001604052806000815250611096565b6000828152600660205260409020610e68828261168a565b506040518281527ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce79060200161050c565b8080610ead57506001600160a01b03821615155b15610f6f576000610ebd84610a39565b90506001600160a01b03831615801590610ee95750826001600160a01b0316816001600160a01b031614155b8015610efc5750610efa818461097d565b155b15610f255760405163a9fbf51f60e01b81526001600160a01b038416600482015260240161053e565b8115610f6d5783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5050600090815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b610faa8383836110ae565b6105c3576001600160a01b038316610fd857604051637e27328960e01b81526004810182905260240161053e565b60405163177e802f60e01b81526001600160a01b03831660048201526024810182905260440161053e565b6060600061101083611111565b600101905060008167ffffffffffffffff811115611030576110306113d6565b6040519080825280601f01601f19166020018201604052801561105a576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a850494508461106457509392505050565b6110a083836111e9565b6105c3336000858585610c96565b60006001600160a01b038316158015906108ae5750826001600160a01b0316846001600160a01b031614806110e857506110e8848461097d565b806108ae5750506000908152600460205260409020546001600160a01b03908116911614919050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106111505772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef8100000000831061117c576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061119a57662386f26fc10000830492506010015b6305f5e10083106111b2576305f5e100830492506008015b61271083106111c657612710830492506004015b606483106111d8576064830492506002015b600a83106103fa5760010192915050565b6001600160a01b03821661121357604051633250574960e11b81526000600482015260240161053e565b600061122183836000610aac565b90506001600160a01b038116156105c3576040516339e3563760e11b81526000600482015260240161053e565b6001600160e01b0319811681146109e657600080fd5b60006020828403121561127657600080fd5b8135610e2f8161124e565b60005b8381101561129c578181015183820152602001611284565b50506000910152565b600081518084526112bd816020860160208601611281565b601f01601f19169290920160200192915050565b602081526000610e2f60208301846112a5565b6000602082840312156112f657600080fd5b5035919050565b80356001600160a01b038116811461131457600080fd5b919050565b6000806040838503121561132c57600080fd5b611335836112fd565b946020939093013593505050565b60008060006060848603121561135857600080fd5b611361846112fd565b925061136f602085016112fd565b9150604084013590509250925092565b60006020828403121561139157600080fd5b610e2f826112fd565b600080604083850312156113ad57600080fd5b6113b6836112fd565b9150602083013580151581146113cb57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115611407576114076113d6565b604051601f8501601f19908116603f0116810190828211818310171561142f5761142f6113d6565b8160405280935085815286868601111561144857600080fd5b858560208301376000602087830101525050509392505050565b6000806000806080858703121561147857600080fd5b611481856112fd565b935061148f602086016112fd565b925060408501359150606085013567ffffffffffffffff8111156114b257600080fd5b8501601f810187136114c357600080fd5b6114d2878235602084016113ec565b91505092959194509250565b6000602082840312156114f057600080fd5b813567ffffffffffffffff81111561150757600080fd5b8201601f8101841361151857600080fd5b6108ae848235602084016113ec565b6000806040838503121561153a57600080fd5b611543836112fd565b9150611551602084016112fd565b90509250929050565b600181811c9082168061156e57607f821691505b60208210810361158e57634e487b7160e01b600052602260045260246000fd5b50919050565b600083516115a6818460208801611281565b8351908301906115ba818360208801611281565b01949350505050565b6000600182016115e357634e487b7160e01b600052601160045260246000fd5b5060010190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061161d908301846112a5565b9695505050505050565b60006020828403121561163957600080fd5b8151610e2f8161124e565b601f8211156105c357600081815260208120601f850160051c8101602086101561166b5750805b601f850160051c820191505b81811015610db857828155600101611677565b815167ffffffffffffffff8111156116a4576116a46113d6565b6116b8816116b2845461155a565b84611644565b602080601f8311600181146116ed57600084156116d55750858301515b600019600386901b1c1916600185901b178555610db8565b600085815260208120601f198616915b8281101561171c578886015182559484019460019091019084016116fd565b508582101561173a5787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220f907eed44deec64b615d368677ec852e161fddc3aa01a35f6e120511bc7e2dc064736f6c63430008140033";

type Magic8BallNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Magic8BallNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Magic8BallNFT__factory extends ContractFactory {
  constructor(...args: Magic8BallNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Magic8BallNFT & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Magic8BallNFT__factory {
    return super.connect(runner) as Magic8BallNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Magic8BallNFTInterface {
    return new Interface(_abi) as Magic8BallNFTInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): Magic8BallNFT {
    return new Contract(address, _abi, runner) as unknown as Magic8BallNFT;
  }
}
