require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`, // Địa chỉ cho testnet Sepolia
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
