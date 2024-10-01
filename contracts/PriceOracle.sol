// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PriceOracle {
    uint256 public price; // Giá hiện tại của cặp WIF/USD
    address public owner;

    event PriceUpdated(uint256 newPrice);

    constructor() {
        owner = msg.sender; // Người triển khai hợp đồng là chủ sở hữu
        price = 0;
    }

    // Chỉ cho phép chủ sở hữu cập nhật giá
    function updatePrice(uint256 _price) external {
        require(msg.sender == owner, "Only owner can update price");
        price = _price;
        emit PriceUpdated(price); // Phát sự kiện khi giá được cập nhật
    }
}



