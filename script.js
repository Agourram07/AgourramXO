const board = document.getElementById('board');
const status = document.getElementById('status');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
    board.innerHTML = '';
    cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }
    status.innerHTML = `الدور على ${currentPlayer}`;
}

function handleCellClick(index) {
    if (!gameActive || cells[index].innerText !== '') return;
    cells[index].innerText = currentPlayer;
    if (checkWin()) {
        status.innerHTML = `${currentPlayer} فاز!`;
        gameActive = false;
        return;
    }
    if (cells.every(cell => cell.innerText !== '')) {
        status.innerHTML = 'تعادل!';
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerHTML = `الدور على ${currentPlayer}`;
    if (currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let availableCells = cells.filter(cell => cell.innerText === '');
    if (availableCells.length === 0) return;
    let randomIndex = Math.floor(Math.random() * availableCells.length);
    availableCells[randomIndex].innerText = 'O';
    if (checkWin()) {
        status.innerHTML = 'O فاز!';
        gameActive = false;
        return;
    }
    currentPlayer = 'X';
    status.innerHTML = `الدور على ${currentPlayer}`;
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => cells[index].innerText === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    createBoard();
}

createBoard();
