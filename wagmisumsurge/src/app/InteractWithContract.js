import { usePrepareContractWrite, useContractWrite, useContractRead, erc20ABI } from 'wagmi';
import { utils } from 'ethers';
import { myAbi } from './abi.json'

const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
const testAddress = '0x5b8f1310A956ee1521A7bB56160451C786289aa9';

export function InteractWithContract() {
  // Prepare the transaction
  const { config, error: contractWriteError } = usePrepareContractWrite({
    address: contractAddress,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [testAddress, utils.parseEther('100')],
  });

  // Get the write function
  const { data: writeData, isLoading: writeLoading, write } = useContractWrite(config);

  // Read values from the smart contract
  const { data: readData, isLoading: readLoading } = useContractRead({
    address: contractAddress,
    abi: myAbi,
    functionName: 'balanceOf',
    args: [testAddress],
  });

  console.log(contractWriteError);

  return (
    <div>
      {readData && (<p>The address {testAddress} has {utils.formatEther(readData)} LINK</p>)}
      {readLoading && <p>Loading the balance data...</p>}
      {writeLoading && <p>Please confirm the transaction on your wallet</p>}
      {writeData && <p>The transaction was sent! Here is the hash: {writeData.hash}</p>}
      {!writeLoading && (<button disabled={!write} onClick={() => write()}>Write function</button>)}
      {contractWriteError && (<p>Calling that contract function will fail for this reason: {contractWriteError.reason ?? contractWriteError.message}</p>)}
    </div>
  );
}
