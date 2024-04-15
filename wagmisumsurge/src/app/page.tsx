'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const [isVisible, setIsVisible] = useState(true);
  const [gridValues, setGridValues] = useState([0]);
  useEffect(() => {

    setGridValues(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);

  }, []);

  const [score, setScore] = useState([0]);
  const [activeRow, setActiveRow] = useState(3);

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
    setScore([]);
    setActiveRow(3);
  };

  const [totalScore, setTotalScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');


  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      <h1 >Game Start</h1>

      <div style={{ display: "grid", placeContent: "center", height: "100vh", gap: "0.8rem", }}>
        <MotionConfig transition={{ duration: 0.7, ease: "backInOut", times: [0, 0.25, 1] }}>
          <motion.div className="flex justify-center bg-black p-10 items-center h-screen bg-gray-100">
            <motion.div className="grid grid-rows-4 grid-cols-3 gap-4 w-[500px] h-4/5">
              {gridValues.map((value, index) => (
                <motion.button
                  key={index}
                  animate={value === lastClicked ? { fontSize: "2em", color: "green" } : { fontSize: "1em", color: "white" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full ${Math.floor(index / 3) > activeRow ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleClick(value, Math.floor(index / 3))}
                  disabled={Math.floor(index / 3) > activeRow}
                >
                  {value}
                </motion.button>
              ))}
              {gameStatus === 'end' && (
                <div>
                  <button onClick={handleEnd}>End Game</button>
                  <button onClick={handleContinue}>Continue Game</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </MotionConfig>

        <motion.div>Total Score: {totalScore}</motion.div>
      </div>

    </>
  )

}

export default App
