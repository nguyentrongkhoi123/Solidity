//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "node_modules/hardhat/console.sol";

contract Floppy is
    ERC20("Floppy", "FLP"),
    ERC20Burnable,
    Ownable
{
    uint256 private cap = 5_000;
    constructor() {
        console.log("owner: %s maxcap: %s", msg.sender, cap);
        _mint(msg.sender, cap);
        transferOwnership(msg.sender);
    }
    function mint(address to, uint256 amount) public onlyOwner {
        require(
            ERC20.totalSupply() + amount <= cap,
            "Floppy: cap exceeded"
        );
        _mint(to, amount);
    }
}