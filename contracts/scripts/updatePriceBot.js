const Web3 = require('web3');
require('dotenv').config(); // Import dotenv để sử dụng biến môi trường

const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newPrice",
                "type": "uint256"
            }
        ],
        "name": "PriceUpdated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "price",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "updatePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contractAddress = '0xD75410B38d61E61E1Eb49DA00C415BE60883AAaB';
const web3 = new Web3('https://sepolia.infura.io/v3/ef9cfd82c19c401983ae9c96d5243321');

const oracleContract = new web3.eth.Contract(contractABI, contractAddress);
const account = process.env.ACCOUNT; // Địa chỉ ví của bạn từ biến môi trường
const privateKey = process.env.PRIVATE_KEY; // Khóa riêng từ biến môi trường

async function getLatestWIFUSDPrice() {
    // Bạn có thể thay thế logic lấy giá thực tế từ nguồn dữ liệu ngoài
    return Math.random() * 1000; // Trả về giá ngẫu nhiên cho ví dụ
}

async function updateOraclePrice(newPrice) {
    try {
        const data = oracleContract.methods.updatePrice(newPrice).encodeABI();
        const nonce = await web3.eth.getTransactionCount(account, 'pending'); // Lấy nonce từ pending

        const tx = {
            to: contractAddress,
            gas: 791, // Đặt gas hợp lý
            gasPrice: await web3.eth.getGasPrice(),
            data: data,
            nonce: nonce,
            chainId: 11155111 // Chain ID cho Sepolia
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(`Price updated to: ${newPrice}. Transaction receipt:`, receipt);
    } catch (error) {
        console.error("Error updating price:", error);
    }
}

setInterval(async () => {
    const newPrice = await getLatestWIFUSDPrice();

    // Lấy giá hiện tại từ hợp đồng
    const currentPrice = await oracleContract.methods.price().call(); // Sử dụng phương thức `price` để lấy giá

    // Kiểm tra nếu giá mới khác với giá cũ trước khi cập nhật
    if (newPrice !== currentPrice) {
        await updateOraclePrice(newPrice);
    } else {
        console.log("Price has not changed. No update needed.");
    }
}, 300000); // Cập nhật mỗi 5 phút
