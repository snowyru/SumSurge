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

main()
