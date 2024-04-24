'use client'

const  { ethers } = require("ethers");
require('dotenv').config({path: '../../.env.local'});
import { useState, useEffect } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import sumsurgeabi from './abi.json';

function App() {

    const [isVisible, setIsVisible] = useState(true);
    const [gridValues, setGridValues] = useState([0]);
    useEffect(() => {
            const randomNumbers = Array.from({length:12}, () => Math.floor(Math.random() * 10));
            setGridValues(randomNumbers);

            }, []);

    const [score, setScore] = useState([0]);
    const [activeRow, setActiveRow] = useState(3);
    const [lastActiveRow, setLastActiveRow] = useState(null);
    const [lastClickedIndex, setLastClickedIndex] = useState(null);

    const handleClick = (value, rowIndex) => {
        if (rowIndex === activeRow) {
            const newScore = Number(value);
            setScore([...score, newScore]);
            setTotalScore(totalScore + newScore); 
            setActiveRow(activeRow - 1); 
            setLastClicked(value); 
            if (rowIndex === 0) {
                setGameStatus('end'); 
            }
        }
    };

    const [lastClicked, setLastClicked] = useState(null);

    const handleEnd = () => {
        alert(`Total Score: ${totalScore}`); 
        setTotalScore(0);
        setScore([]); 
        setActiveRow(3); 
        setGameStatus('playing'); 
    };

    const handleContinue = () => {
      const randomNumbers = Array.from({length:12}, () => Math.floor(Math.random() * 10));
        setGridValues(randomNumbers);
        setScore([]);
        setActiveRow(3);
    };

    const [totalScore, setTotalScore] = useState(0);
    const [gameStatus, setGameStatus] = useState('playing');

//TESTING ETHERS JS FUNCTION CALL    
    const [currentAccount, setCurrentAccount] = useState('')
    const ERC20_ABI = sumsurgeabi.abi;
    const address = '0x4495c65f31e935264367b7Ea5A825f2bd8c246b6'

    const alfajores = {
        chainId: 44787, // Celo Alfajores Testnet Chain ID
        name: 'alfajores',
        url: 'https://alfajores-forno.celo-testnet.org'
    };

    // Create a new provider instance
    const [walletAddress, setWalletAddress] = React.useState(null);
    const connectToWallet = async () => {
        try {
            await window.ethereum.enable();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWalletAddress(accounts[0]);
            console.log('Wallet connected:', walletAddress);
        } catch (error) {
            console.error(error);
        }
    };

    const main = async () => {
    const accounts = await provider.listAccounts();
    console.log(accounts); // This will log the accounts

    // If accounts are available, you can create a signer and contract instance
    if (accounts.length > 0) {
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, ERC20_ABI, signer)
        }
    }

    return (
            <>
<div className="min-h-screen bg-gold flex items-center justify-center">
        <h1 className="text-4xl text-center font-bold">Game Part: </h1>
        <button onClick={main}>Run main</button>
    <div className="text-center mx-9 space-y-4">
        <h1 className="text-4xl font-bold">Sum Surge!</h1>
    </div>      
        <motion.div className="" style={{ display: "grid", placeContent: "center", height: "100vh", gap: "0.8rem", }}>
        <MotionConfig transition={{ duration: 0.7, ease: "backInOut", times: [0, 0.25, 1] }}>
        <motion.div className="flex justify-center bg-black p-10 items-center h-screen ">
        <motion.div className="grid grid-rows-4 bg-black grid-cols-3 gap-4 w-[500px] h-4/5">
        {gridValues.map((value, index) => (
                   
<motion.button
    key={index}
    animate={
        Math.floor(index / 3) === lastActiveRow
        ? (value === lastClicked ? { fontSize: "2em", color: "green" } : { fontSize: "3rem", color: "white" })
        : { fontSize: "4rem", color: "white" }
    }
    transition={{ type: "spring", stiffness: 300 }}
    className={`font-bold py-2 px-4 rounded-full ${Math.floor(index / 3) === activeRow ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-blue-500 hover:bg-blue-700'} ${Math.floor(index / 3) > activeRow ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={() => {
        if (lastClickedIndex === null || Math.abs(lastClickedIndex - index % 3) <= 1) {
            handleClick(value, Math.floor(index / 3));
            setLastActiveRow(Math.floor(index / 3));
            setLastClickedIndex(index % 3);
        }
    }}
    disabled={Math.floor(index / 3) > activeRow || (lastClickedIndex !== null && Math.abs(lastClickedIndex - index % 3) > 1)}
    style={Math.floor(index / 3) > activeRow || (lastClickedIndex !== null && Math.abs(lastClickedIndex - index % 3) > 1) ? { cursor: "not-allowed", opacity: "0.6" } : {}}
>
    {value}
</motion.button>

                    ))}
    {gameStatus === 'end' && (
            <div className="flex justify-center">
            <motion.button className="justify-center mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded" onClick={handleEnd}>End Game</motion.button>
            <motion.button className="justify-center mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded" onClick={handleContinue}>Continue Game</motion.button>
            </div>
            )}
    </motion.div>
        </motion.div>
        </MotionConfig>

        <motion.div className="text-center text-5xl font-thin text-indigo-300 pb-1" >Total Score: {totalScore}</motion.div>
        </motion.div>
</div>

        </>
        )

}

export default App
