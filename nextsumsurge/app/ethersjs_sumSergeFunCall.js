import { ethers } from 'ethers';

// Function to get the admin address
async function getAdmin() {
  const admin = await contract.functions.admin();
  console.log('Admin Address:', admin);
}

// Function to get the board
async function getBoard() {
  const board = await contract.functions.getBoard();
  console.log('Board:', board);
}

// Function to move to the next level


// Function to reset the board
async function resetBoard() {
  const result = await contract.functions.resetBoard().send({ from: 'YOUR_ADDRESS' });
  console.log('Board reset:', result);
}

// Function to start the game