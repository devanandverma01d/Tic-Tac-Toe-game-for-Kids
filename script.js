// Initialize the game
const board = document.getElementById('board');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Create the cells for the board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', handleCellClick);
  board.appendChild(cell);
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    if (checkWinner()) {
      alert(`Player ${currentPlayer} wins!`);
      resetGame();
    } else if (gameBoard.every(cell => cell !== '')) {
      alert('It\'s a tie!');
      resetGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Check for a winner
function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      return true;
    }
  }

  return false;
}

// Reset the game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';
  });
}
