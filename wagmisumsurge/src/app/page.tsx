'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

function App() {
    const account = useAccount()
        const { connectors, connect, status, error } = useConnect()
        const { disconnect } = useDisconnect()

        // mystery button 
        const START_TEXT = "???"
        const TARGET_TEXT = "BOMB";
        const CYCLES_PER_LETTER = 1;
        const SHUFFLE_TIME = 50;
        const CHARS = "/$BOMBx2";
    const EncryptButton = ({mysteryValue}) => {
        const intervalRef = useRef(null);
        const [text, setText] = useState(START_TEXT);
        const [isScrambling, setIsScrambling] = useState(true);

        const scramble = () => {
        intervalRef.current = setInterval(() => {
                if (isScrambling) { // Only scramble if isScrambling is true
                const scrambled = START_TEXT.split("")
                        .map((char, index) => {
                        if (index < 3) { // Only scramble the first 3 characters
                                const randomCharIndex = Math.floor(Math.random() * CHARS.length);
                                const randomChar = CHARS[randomCharIndex];
                                return randomChar;
                        } else {
                                return ''; 
                        }
                        })
                        .join("");
                setText(scrambled);
                }
        }, SHUFFLE_TIME);
        };

        const stopScramble = () => {
            clearInterval(intervalRef.current || undefined);
            setIsScrambling(false);
            setText(TARGET_TEXT);
        };

   useEffect(() => { scramble(); return () => { setIsScrambling(false); stopScramble(); }; }, []);

       return (
                <motion.button
                    whileHover={{ scale: 1.025, }} 
                    whileTap={{ scale: 0.975, }}
                    onClick={stopScramble}
                    className="group relative overflow-hidden rounded-lg border-[1px] border-neutral-500 bg-neutral-700 px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-indigo-300" >

                    <div className="relative z-10 flex items-center gap-2">

                    <span>{text}</span>

                    </div>

                    <motion.span initial={{ y: "100%", }} animate={{ y: "-100%", }} transition={{ repeat: Infinity,
                    repeatType: "mirror", duration: 1, ease: "linear", }} className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.button>
                );
        };


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

//Game start
<div className="grid min-h-[200px] place-content-center bg-neutral-900 p-4">
<EncryptButton mysteryValue={'x2'} />
</div>  
</>
)
}

export default App
