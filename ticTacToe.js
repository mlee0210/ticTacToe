const prompt = require('prompt');

const showCurrentBoard = (board) => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i][0], '|', board[i][1], '|', board[i][2]);
  }
}

const checkWin = (board, player, row, column) => {
  // check horizonal
  if (board[row][(column + 2) % 3] === player && board[row][(column + 1) % 3] === player) {
    return true;
  }
  // check vertical
  if (board[(row + 2) % 3][column] === player && board[(row + 1) % 3][column] === player) {
    return true;
  }
  // check major diag
  if (row === column && board[(row + 2) % 3][(column + 2) % 3] === player && board[(row + 1) % 3][(column + 1) % 3] === player) {
    return true;
  }
  // check minor diag
  if (row + column === 2 && board[(row + 2) % 3][(column + 1) % 3] === player && board[(row + 1) % 3][(column + 2) % 3] === player) {
    return true;
  }
  return false;
}

const makeMove = (board, currentPlayer) => {
  showCurrentBoard(board);
  console.log(currentPlayer,' \'s turn');
  
  prompt.get(['square'], (err, result) => {
    if(err) {
  	  console.log('ERROR');
  	}
  	if(!(result.square > 0 && result.square < 10)) {
  	  console.log('Invalid square. Please try again');
  	  makeMove(board, currentPlayer);
  	} else {
  	  let row = Math.floor((result.square - 1) / 3);
  	  let column = (result.square - 1) % 3;

  	  if(board[row][column] !== ' ') {
  	  	console.log('Try again');
  	  	makeMove(board, currentPlayer);
  	  } else {
  	    board[row][column] = currentPlayer;
  	  	if(checkWin(board, currentPlayer, row, column)) {
  	  	  showCurrentBoard(board);
  	  	  console.log(currentPlayer, ' wins!');
  	  	  console.log('Would you like to play again? (Y/N)');
  	  	  prompt.get(['answer'], (err, result) => {
  	  	    if(err) {
  	  		  console.log('ERROR');
  	  		} 
  	  		if(result.answer.toUpperCase() === 'Y') {
  	  		  startGame();
  	  		} else {
  	  		  console.log('Goodbye');
  	  		}
  	  	  });
  	  	} else {
  	  	  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  	  	  makeMove(board, currentPlayer);
  	  	}
  	  }
  	}

  });

}

const startGame = () => {
  let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],    
  ];
  let isPlaying = true;
  let currentPlayer = 'X';
  makeMove(board, currentPlayer);
}

prompt.start();
startGame();