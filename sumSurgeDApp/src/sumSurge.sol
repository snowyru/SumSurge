// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <=0.9.1;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Sumsurge{
    address public admin;
    IERC20 private celoToken;
    address internal _celoTokenAddress =
        0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9;
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
        celoToken = IERC20(_celoTokenAddress);
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
        return (board);
    }
    function resetBoard() public {
        for (uint8 i = 0; i < 12; i++) {
            delete players[msg.sender].board[i];
        }
    }

    function start() external returns (uint8[12] memory){

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
    // Function to randomly assign numbers from [10, 11, 12, 13, 14, 15]
    function remakeBoard() internal {
        uint256 diff = uint256(players[msg.sender].level);
        uint256 tmp;

        if (diff > 3 && diff < 6) {
            uint256 opSel = uint256(ranNum(5)) + 10; // Choose from [10, 11, 12, 13, 14, 15]
            uint256 boardSel = uint256(ranNum(12));
            players[msg.sender].board[boardSel] = uint8(opSel);
        } 
        if (diff >= 6 && diff < 8) {
            for (uint256 i = 0; i < 2; i++) {
                uint256 opSel = uint256(ranNum(5)) + 10;
                uint256 boardSel = uint256(ranNum(12));
                while (boardSel == tmp) {
                    boardSel = uint256(ranNum(12));
                }
                tmp = boardSel;
                players[msg.sender].board[boardSel] = uint8(opSel);
            }
        }
        if (diff >= 8) {
            for (uint256 i = 0; i < 3; i++) {
                uint256 opSel = uint256(ranNum(5)) + 10;
                uint256 boardSel = uint256(ranNum(12));
                while (boardSel == tmp) {
                    boardSel = uint256(ranNum(12));
                }
                tmp = boardSel;
                players[msg.sender].board[boardSel] = uint8(opSel);
            }
        }
    }

    function getBoard() public view returns (uint8[12] memory){
        return (players[msg.sender].board);
    }
	function payOut() public payable {
		require(players[msg.sender].score > 0, "No payout");
        players[msg.sender].payout = players[msg.sender].score / 1000;
        IERC20(_celoTokenAddress).approve(
                admin,
                players[msg.sender].payout
        );
        IERC20(_celoTokenAddress).transferFrom(
                admin,
                players[msg.sender].id,
                players[msg.sender].payout
        );
        delete players[msg.sender];
    }
} 
