const { ethers } = require("ethers");
//require('dotenv').config({path: '../../.env.local'});

//const INFURA_ID = process.env.INFURA_ID
//const provider = new ethers.providers.JsonRpcProvider(`https://celo-alfajores.infura.io/v3/${INFURA_ID}`)
//const provider = new ethers.providers.JsonRpcProvider('https://celo-alfajores.infura.io/v3/e32205ed14384c329d2ddd1ff42cff51')
//const ERC20_ABI = [ "function getBoard() view returns (unit8[12])", ];

const address = '0x4495c65f31e935264367b7Ea5A825f2bd8c246b6' 
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/e32205ed14384c329d2ddd1ff42cff51')
//const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
}
// First, convert the hexadecimal hash back to bytes.
function hexToBytes(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

function bytesToString(bytes) {
    return new TextDecoder().decode(new Uint8Array(bytes));
}

const hashedValue = "0x529cab8288bf1ff6caed7ff3c676eeae36022f82efefea03ec0573d91930e0ad";
const bytes = hexToBytes(hashedValue);
const originalString = bytesToString(bytes);

console.log("Original String:", originalString);


// main()
