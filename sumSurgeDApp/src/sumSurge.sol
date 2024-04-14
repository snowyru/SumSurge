// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.1 <=0.9.1;

contract Sumsurge{
	address public admin;
	uint8[] public board;
  
	struct Player {
		address id;
		uint8 level;
		uint score;
		uint payout;
	}	
	mapping (address => Player) public players;

	constructor() {
		admin = msg.sender;
	}
	// block.difficulty
	function randomBoard(uint256 _timestamp) internal {
		uint256 seed;

		seed = uint256(
			keccak256(
				abi.encodePacked(_timestamp, "1212")
		));
		for (uint8 i = 0; i < 12; i++) {
			board.push(uint8(
				uint256(keccak256(abi.encodePacked(seed, i))) % 9 + 1
      		));
		}
	}
	function resetBoard() public {
    	for (uint8 i = 0; i < 12; i++) {
    		board.pop();
		}
	}
	
	function start() external returns (uint8[] memory){

		Player memory newPlayer = Player({
			id: msg.sender,
			level: 0,
			score: 0,
			payout: 0
		});
		players[msg.sender] = newPlayer; 
    	randomBoard(block.timestamp);
		return (board);
	}

	function nextLevel(uint _score) external returns (uint8 [] memory){

		players[msg.sender].score += _score;
		players[msg.sender].level++;
    	resetBoard();
		if (players[msg.sender].level > 3){
			randomBoard(block.timestamp);	
			remakeBoard();	
		} else {
			randomBoard(block.timestamp);
		}
		return (board);
	}

	function ranNum(uint8 _i) internal view returns (uint8) {
		uint8 num;
		uint256 seed;

		seed = uint256(
			keccak256(abi.encodePacked(block.timestamp, "SALT"))
		);
		num = uint8(
        	uint256(keccak256(abi.encodePacked(seed, players[msg.sender].level))) % _i + 1
    	);
		return (num);
	}

	function remakeBoard() internal {
		uint8 diff; uint8 opSel; uint8 boardSel; uint8 tmp;

		tmp = 0;
		diff = players[msg.sender].level;

		if (diff > 3 && diff < 6){
			opSel = ranNum(5) + 9;
			boardSel = ranNum(12);
			board[boardSel] = opSel;
    	} else if (diff >= 6 && diff < 8) {
			for (uint8 i = 0; i < 2; i++) {
				opSel = ranNum(5) + 9;
				boardSel = ranNum(12);
				if (tmp == boardSel) {
					boardSel = ranNum(12);
				}
        		if (boardSel == tmp) {
            	boardSel = ranNum(12);
        		}
        		tmp = boardSel;
				board[boardSel] = opSel;
			}
		} else {
			for (uint8 i = 0; i < 3; i++) {
				opSel = ranNum(5) + 9;
				boardSel = ranNum(12);
          if (tmp == boardSel) {
            boardSel = ranNum(12);
          }
          if (tmp == boardSel) {
            boardSel = ranNum(12);
          }
          if (tmp == boardSel) {
            boardSel = ranNum(12);
          }
          tmp = boardSel;
          board[boardSel] = opSel;
		  }

		}
	}

	
	function getBoard() public view returns (uint8[] memory){
    	return (board);  
  	}

	function payOut() external payable {
		uint amount = players[msg.sender].score / 1000;
		players[msg.sender].payout = amount;
		
	}
}

