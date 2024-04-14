// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.1 <=0.9.1;

contract Sumsurge{
	address public admin;
  //uint8[] public board;
  
	struct Player {
		address id;
		uint8 level;
		uint score;
		uint payout;
    uint8[12] board; 
	}	
	
	mapping (address => Player) public players;

	constructor() {
		admin = msg.sender;
	}
// block.difficulty
function randomBoard(uint256 _timestamp) internal returns (uint8[12] memory) {
  uint256 seed;
  uint8[12] memory board;

  seed = uint256(
    keccak256(
      abi.encodePacked(_timestamp, "1212")
    ));
  for (uint8 i = 0; i < 12; i++) {
    board[i] = uint8(
      uint256(keccak256(abi.encodePacked(seed, i))) % 9 + 1
    );
  }
  return board;
}
  function resetBoard() public {
    for (uint8 i = 0; i < 12; i++) {
      delete players[msg.sender].board[i];
    }
  }
	
	function start() external returns (uint8[12] memory){

		//uint8 [] memory board = randomBoard(block.timestamp);
		Player memory newPlayer = Player({
			id: msg.sender,
			level: 0,
			score: 0,
			payout: 0,
      board: randomBoard(block.timestamp)
		});
		players[msg.sender] = newPlayer; 
		return (players[msg.sender].board);
	}

	function nextLevel(uint _score) external returns (uint8 [12] memory){

		players[msg.sender].score += _score;
		players[msg.sender].level++;
    resetBoard();
		if (players[msg.sender].level > 3){
			players[msg.sender].board = randomBoard(block.timestamp);	
			remakeBoard();	
		} else {
			players[msg.sender].board = randomBoard(block.timestamp);
		}
		return (players[msg.sender].board);
	}

	function ranNum(uint8 _i) internal view returns (uint8) {
		uint8 num;
		uint256 seed;

		seed = uint256(
			keccak256(abi.encodePacked(block.timestamp, players[msg.sender].score))
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
			boardSel = ranNum(12) - 1;
			players[msg.sender].board[boardSel] = opSel;
    } else if (diff >= 6 && diff < 8) {
			for (uint8 i = 0; i < 2; i++) {
				opSel = ranNum(5) + 9;
				boardSel = ranNum(12) - 1;
				if (tmp == boardSel) {
					boardSel = ranNum(12) - 1;
				}
        if (boardSel == tmp) {
            boardSel = ranNum(12) - 1;
        }
        tmp = boardSel;
				players[msg.sender].board[boardSel] = opSel;
			}
		} else { 
			for (uint8 i = 0; i < 3; i++) {
				opSel = ranNum(5) + 9;
				boardSel = ranNum(12) - 1;
          if (tmp == boardSel) {
            boardSel = ranNum(12) - 1;
          }
          if (tmp == boardSel) {
            boardSel = ranNum(12);
          }
          if (tmp == boardSel) {
            boardSel = ranNum(12) - 1;
          }
          tmp = boardSel;
          players[msg.sender].board[boardSel] = opSel;
		  }
				
		}	
	}
	

  function getBoard() public view returns (uint8[12] memory){
      return (players[msg.sender].board);  
  }

	function payOut() external payable {
		uint amount = players[msg.sender].score / 1000;
		players[msg.sender].payout = amount;
		
	}
}
