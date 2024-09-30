const { ethers } = require("hardhat");

async function main() {
    try {
        // Triển khai hợp đồng PriceOracle
        const PriceOracle = await ethers.getContractFactory("PriceOracle");
        const priceOracle = await PriceOracle.deploy();
        await priceOracle.deployed();
        console.log("PriceOracle deployed to:", priceOracle.address);

        // Kiểm tra xem địa chỉ hợp đồng PriceOracle có hợp lệ không
        if (!ethers.utils.isAddress(priceOracle.address)) {
            throw new Error("Invalid PriceOracle address");
        }
        
        // Triển khai hợp đồng BinaryOptionMarket
        const BinaryOptionMarket = await ethers.getContractFactory("BinaryOptionMarket");
        const binaryOptionMarket = await BinaryOptionMarket.deploy(priceOracle.address);
        await binaryOptionMarket.deployed();
        console.log("BinaryOptionMarket deployed to:", binaryOptionMarket.address);

        // Kiểm tra xem địa chỉ hợp đồng BinaryOptionMarket có hợp lệ không
        if (!ethers.utils.isAddress(binaryOptionMarket.address)) {
            throw new Error("Invalid BinaryOptionMarket address");
        }
    } catch (error) {
        console.error("Error deploying contracts:", error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
