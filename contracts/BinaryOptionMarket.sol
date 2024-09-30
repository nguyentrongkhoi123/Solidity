// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PriceOracle.sol";

contract BinaryOptionMarket {
    PriceOracle public priceOracle;

    constructor(address _oracleAddress) {
        priceOracle = PriceOracle(_oracleAddress);
    }

    function getCurrentPrice() public view returns (uint256) {
        return priceOracle.price(); // Lấy giá từ Oracle
    }

    // Các chức năng khác liên quan đến Binary Options...
}
