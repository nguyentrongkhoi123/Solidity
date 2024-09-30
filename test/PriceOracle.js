const PriceOracle = artifacts.require("PriceOracle");

contract("PriceOracle", accounts => {
    it("should set the owner correctly", async () => {
        const instance = await PriceOracle.deployed();
        const owner = await instance.owner();
        assert.equal(owner, accounts[0], "Owner should be the account that deployed the contract");
    });

    // Thêm các kiểm tra khác...
});
