const Web3 = require('web3');
const contractABI = [/* ABI của hợp đồng PriceOracle */];
const contractAddress = '0xYourOracleContractAddress';
const web3 = new Web3('https://your.ethereum.node');

const oracleContract = new web3.eth.Contract(contractABI, contractAddress);
const account = '0xYourAccount'; // Địa chỉ của tài khoản gửi giao dịch
const privateKey = '0xYourPrivateKey'; // Khóa riêng của tài khoản

async function updateOraclePrice(newPrice) {
    const data = oracleContract.methods.updatePrice(newPrice).encodeABI();
    const nonce = await web3.eth.getTransactionCount(account);
    
    const tx = {
        to: contractAddress,
        gas: 2000000,
        data: data,
        nonce: nonce,
        chainId: 1 // hoặc mạng mà bạn đang sử dụng
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}

// Gọi hàm này thường xuyên
setInterval(async () => {
    const newPrice = await getLatestWIFUSDPrice(); // Một hàm giả để lấy giá mới
    await updateOraclePrice(newPrice);
}, 300000); // Cập nhật mỗi 5 phút
