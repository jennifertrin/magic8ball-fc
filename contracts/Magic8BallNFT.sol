// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Magic8BallNFT is ERC721URIStorage, Ownable {
    uint256 public mintingFee = 0.002 ether;
    uint256 public nextTokenId = 1;

    event Minted(address indexed minter, uint256 indexed tokenId, string tokenURI);
    event MintingFeeChanged(uint256 oldFee, uint256 newFee);
    event FeesWithdrawn(address indexed owner, uint256 amount);

    constructor() ERC721("Magic 8 Ball NFT", "M8B") Ownable(msg.sender) {}

    function mint(string memory _tokenURI) external payable returns (uint256) {
        require(msg.value >= mintingFee, "Insufficient minting fee");

        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        emit Minted(msg.sender, tokenId, _tokenURI);
        return tokenId;
    }

    function setMintingFee(uint256 newFee) external onlyOwner {
        uint256 oldFee = mintingFee;
        mintingFee = newFee;
        emit MintingFeeChanged(oldFee, newFee);
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        (bool sent, ) = payable(owner()).call{value: balance}("");
        require(sent, "Withdraw failed");
        emit FeesWithdrawn(owner(), balance);
    }

    // Allow contract to receive ETH
    receive() external payable {}
} 