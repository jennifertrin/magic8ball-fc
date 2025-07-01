const { ethers } = require("hardhat");

async function main() {
  console.log("🧪 Testing Magic8BallNFT contract...");

  // Get the deployed contract
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    console.error("❌ Please set CONTRACT_ADDRESS environment variable");
    process.exit(1);
  }

  const Magic8BallNFT = await ethers.getContractFactory("Magic8BallNFT");
  const contract = Magic8BallNFT.attach(contractAddress);

  console.log("📍 Contract address:", contractAddress);

  try {
    // Test basic contract functions
    console.log("\n📋 Testing contract functions...");

    // Get contract owner
    const owner = await contract.owner();
    console.log("👑 Owner:", owner);

    // Get minting fee
    const mintingFee = await contract.getMintingFee();
    console.log("💰 Minting fee:", ethers.formatEther(mintingFee), "ETH");

    // Get total supply
    const totalSupply = await contract.totalSupply();
    console.log("📊 Total supply:", totalSupply.toString());

    // Get contract name and symbol
    const name = await contract.name();
    const symbol = await contract.symbol();
    console.log("📝 Name:", name);
    console.log("🏷️  Symbol:", symbol);

    console.log("\n✅ Contract test completed successfully!");
    console.log("🌐 Explorer URL:", getExplorerUrl(contractAddress));

  } catch (error) {
    console.error("❌ Contract test failed:", error);
    process.exit(1);
  }
}

function getExplorerUrl(address) {
  const network = process.env.NETWORK || "base";
  if (network === "base") {
    return `https://basescan.org/address/${address}`;
  } else if (network === "baseSepolia") {
    return `https://sepolia.basescan.org/address/${address}`;
  }
  return `https://basescan.org/address/${address}`;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }); 