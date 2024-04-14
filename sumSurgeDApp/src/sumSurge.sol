// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Sumsurge{
	address public admin;
	struct Player {
		address id;
		uint8 level;
		uint score;
		uint payout;
	}	
	uint8 public operators[] = [10, 11, 12, 13, 14, 15];
	mapping (uint => Player) public players;

	constructor() {
		admin = msg.sender;
	}
	function randomBoard() internal view returns (uint8[] memory){
		uint256 seed;
		uint8 [] memory board;

		seed = uint256(
			keccak256(
				abi.encodePacked(block.timestamp, block.difficulty)
		));
		for (uint8 i = 0; i < 12; i++) {
			board[i] = uint8(
				uint256(keccak256(abi.encodePacked(seed, i))) % 9 + 1
			)
		}
		return (board);
	}
	
	function start() external returns (uint8[] memory) {

		uint8 [] memory board = randomBoard();
		Player memory newPlayer = Player({
			id: msg.sender,
			level: 0,
			score: 0,
			payout: 0
		});
		players[msg.sender] = newPlayer; 
		return (board);
	}

	function nextLevel(uint _score) external returns (uint8 [] memory){
		uint8 [] memory board;

		players[msg.sender].score += _score;
		players[msg.sender].level++;
		if (players[msg.sender].level > 3){
			board = randomBoard();	
			remakeBoard(board);	
		} else {
			board = randomBoard();
		}
		return (board);
	}

	function ranNum(uint8 _i) internal view returns (uint8) {
		uint8 num;
		uint256 seed;

		seed = uint256(
			keccak256(abi.encodePacked(block.timestamp, block.difficulty))
		);
		num = uint8(
        	uint256(keccak256(abi.encodePacked(seed, players[msg.sender].level))) % _i + 1
    	);
		
		return (num);
	}

	function remakeBoard(uint8 [] memory board) internal view {
		uint8 diff; uint8 opSel; uint8 boardSel; uint8 tmp;

		boardSel = 0;
		diff = players[msg.sender].level;

		if (diff > 3 && diff < 6){
			opSel = ranNum(5);
			boardSel = ranNum(12);
			board[boardSel] = operators[opSel];
		} else if (diff >=6 && diff < 8) {
			for (uint8 i = 0; i < 2; i++) {
				opSel = ranNum(5);
				tmp = ranNum(12);
				if (tmp == boardSel) {
					boardSel = ranNum(12);
					if (boardSel == tmp) {
						boardSel = ranNum(12);
					}
				}
				board[boardSel] = operators[opSel];
			}
		} else {
			for (uint8 i = 0; i < 3; i++) {
				opSel = ranNum(5);
				tmp = ranNum(12);
				if (tmp == boardSel) {
					boardSel = ranNum(12);
					if (boardSel == tmp) {
						boardSel = ranNum(12);
						if (boardSel == tmp) {
							boardSel = ranNum(12);
						}
					}
				}
				board[boardSel] = operators[opSel];
			}
			
		}
	}

	function payOut() external payable {
		uint amount = players[msg.sender].score / 1000;
		players[msg.sender].payout = amount;
	}
}
