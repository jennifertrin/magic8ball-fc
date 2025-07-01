const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Magic8BallNFT contract...");

  // Get the contract factory
  const Magic8BallNFT = await ethers.getContractFactory("Magic8BallNFT");
  
  console.log("📝 Contract factory created");

  // Deploy the contract
  const magic8BallNFT = await Magic8BallNFT.deploy();
  
  console.log("⏳ Waiting for deployment...");

  // Wait for deployment to complete
  await magic8BallNFT.waitForDeployment();

  // Get the deployed contract address
  const address = await magic8BallNFT.getAddress();
  
  console.log("✅ Magic8BallNFT deployed successfully!");
  console.log("📍 Contract address:", address);
  
  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name);
  
  // Log deployment summary
  console.log("\n📋 Deployment Summary:");
  console.log("========================");
  console.log("Contract: Magic8BallNFT");
  console.log("Address:", address);
  console.log("Network:", network.name);
  console.log("Minting Fee: 0.01 ETH");
  
  if (network.name === "base") {
    console.log("Explorer: https://basescan.org/address/" + address);
  } else if (network.name === "baseSepolia") {
    console.log("Explorer: https://sepolia.basescan.org/address/" + address);
  }
  
  console.log("\n🎉 Deployment complete! Update your frontend with the contract address:");
  console.log(`NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${address}`);
}

// Handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }); 