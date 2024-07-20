function createBoard(size) {
 const board = document.getElementById('board');
 board.innerHTML = '';
 board.style.gridTemplateColumns = `repeat(${size}, 50px)`;
 for (let row = 0; row < size; row++) {
     for (let col = 0; col < size; col++) {
         const square = document.createElement('div');
         square.className = `square ${ (row + col) % 2 === 0 ? 'white' : 'black' }`;
         board.appendChild(square);
     }
 }
}

function startVisualization() {
 const size = parseInt(document.getElementById('size').value);
 createBoard(size);
 const board = new Array(size).fill(0).map(() => new Array(size).fill(false));
 visualize(board, 0, size);
}

function sleep(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualize(board, row, size) {
 if (row === size) return true;
 for (let col = 0; col < size; col++) {
     if (isSafe(board, row, col, size)) {
         board[row][col] = true;
         renderBoard(board, size);
         await sleep(500);
         if (await visualize(board, row + 1, size)) return true;
         board[row][col] = false;
         renderBoard(board, size);
         await sleep(500);
     }
 }
 return false;
}

function isSafe(board, row, col, size) {
 for (let i = 0; i < row; i++) {
     if (board[i][col]) return false;
 }
 for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
     if (board[i][j]) return false;
 }
 for (let i = row, j = col; i >= 0 && j < size; i--, j++) {
     if (board[i][j]) return false;
 }
 return true;
}

function renderBoard(board, size) {
 const boardDiv = document.getElementById('board');
 let index = 0;
 for (let row = 0; row < size; row++) {
     for (let col = 0; col < size; col++) {
         const square = boardDiv.children[index];
         if (board[row][col]) {
             square.classList.add('queen');
         } else {
             square.classList.remove('queen');
         }
         index++;
     }
 }
}

// Initialize the board with default size
createBoard(8);
