/* -------- constants -------- */
const GAME_PIECES = {
    mine: "url('https://w7.pngwing.com/pngs/617/771/png-transparent-microsoft-minesweeper-the-minesweeper-puzzle-video-game-mines-game-computer-wallpaper-symmetry.png')",
    marker: "url('https://inotgo.com/imagesLocal/202108/03/20210803020506364t_4.png')",
}

const columns = 10;

const rows = 10;


/*-------- state variables --------*/
let minefield = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
];
let mines;
let markers;
let numberHints;
let cell;
let win;
let loss;


/*-------- cached elements --------*/
const markerBank = document.getElementById('marker-bank');
const statusMessage = document.querySelector('h1');
const resetBtn = document.querySelector('button');
const timer = document.getElementById('timer');
const minefieldCells = [...document.querySelectorAll('#minefield > div')];


/*-------- event listeners --------*/
document.getElementById('minefield').addEventListener('click', handleLeftClick);
document.getElementById('minefield').addEventListener('contextmenu', handleRightClick);
resetBtn.addEventListener('click', init);


/*-------- functions --------*/
init();

function init() {
    mines = 10;
    markers = 10;
    numberHints = {
        0: 'grey',
        1: 'blue',
        2: 'green',
        3: 'red',
        4: 'purple',
        5: 'maroon',
        6: 'teal',
        7: 'black',
        8: 'white',
    };
    win = null;
    loss = null;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let cell = {isMine: false, adjMineCount: 0, revealed: false, click: false, markerStatus: false,};
            minefield[r][c] = cell;
        }
    };
    setMinefield();
    setAdjacentMineCount();
    render();
}


function handleLeftClick(evt) {
    if ( evt.target.tagName !== 'DIV') return;
    let colIdx = parseInt(evt.target.id[1]);
    let rowIdx = parseInt(evt.target.id[3]);
    const square = minefield[colIdx][rowIdx];
    square.click = true;
    // if (square.isMine = false) {
        // reveal blank squares and/or adjMineCount
    // } else {
        // isMine = true and the game is over. Player loses
    // };
    // winner = checkWinner();
    // checkAdjacentMines();
    floodSquares(colIdx, rowIdx);
    render();
}

function handleRightClick(evt) {
    evt.preventDefault();
    if ( evt.target.tagName !== 'DIV') return;
    let colIdx = parseInt(evt.target.id[1]);
    let rowIdx = parseInt(evt.target.id[3]);
    const square = minefield[colIdx][rowIdx];
    if (square.markerStatus === false) {
        square.markerStatus = true;
        markers--;
    } else if (square.markerStatus === true) {
        square.markerStatus = false;
        markers++;
    }
    markerBank.innerText = markers;
    markerBank.style.color = 'red';
    if (markers < 0) return;
    // winner = checkWinner();
    render();
}

function render() {
    renderMinefield();
    // renderMessage();
    // renderTimer();
}

function setMinefield() {
    let minesRemaining = mines;
    while (minesRemaining > 0) {
        let rowIdx = Math.floor(Math.random() * rows);
        let colIdx = Math.floor(Math.random() * columns);
        if (minefield[rowIdx][colIdx].isMine == false) {
            minesRemaining--;
            minefield[rowIdx][colIdx].isMine = true;
        }
    }
}

function checkAdjacentMines(colIdx, rowIdx) {
    if (rowIdx < 0 || rowIdx > (rows - 1) || colIdx < 0 || colIdx > (columns - 1)) {
        return;
    }
    if (minefield[colIdx][rowIdx].click === true) {
        return;
    }
    minefield[colIdx][rowIdx].click === true;
    // squaresClicked += 1;
    let minesFound = 0;
    minesFound += checkSquare(colIdx - 1, rowIdx - 1);
    minesFound += checkSquare(colIdx - 1, rowIdx);
    minesFound += checkSquare(colIdx - 1, rowIdx + 1);
    minesFound += checkSquare(colIdx, rowIdx - 1);
    minesFound += checkSquare(colIdx, rowIdx + 1);
    minesFound += checkSquare(colIdx + 1, rowIdx - 1);
    minesFound += checkSquare(colIdx + 1, rowIdx);
    minesFound += checkSquare(colIdx + 1, rowIdx + 1);
    if (minesFound > 0) {
        minefield[colIdx][rowIdx].adjMineCount = minesFound;
    }
}

function floodSquares(colIdx, rowIdx) {
    let neighbor1 = document.getElementById(`c${colIdx - 1}r${rowIdx - 1}`);
    let neighbor2 = document.getElementById(`c${colIdx - 1}r${rowIdx}`);
    let neighbor3 = document.getElementById(`c${colIdx - 1}r${rowIdx + 1}`);
    let neighbor4 = document.getElementById(`c${colIdx}r${rowIdx - 1}`);
    let neighbor5 = document.getElementById(`c${colIdx}r${rowIdx + 1}`);
    let neighbor6 = document.getElementById(`c${colIdx + 1}r${rowIdx + 1}`);
    let neighbor7 = document.getElementById(`c${colIdx + 1}r${rowIdx}`);
    let neighbor8 = document.getElementById(`c${colIdx + 1}r${rowIdx + 1}`);

    let neighbors = [neighbor1, neighbor2, neighbor3, neighbor4, neighbor5, neighbor6, neighbor7, neighbor8];

    neighbors.forEach(function(neighbor) {
        if (neighbor) {
            console.log(neighbors);
            let neighborId = neighbor.id;
            let neighborIdArr = neighborId.split('');
            let neighborColIdx = parseInt(neighborIdArr[1]);
            let neighborRowIdx = parseInt(neighborIdArr[3]);
            let neighborCell = minefield[neighborColIdx][neighborRowIdx];
            if (neighborCell.isMine === false && neighborCell.markerStatus === false) {
                if (neighborCell.adjMineCount === 0 && neighborCell.click === false) {
                    neighborCell.click = true;
                    floodSquares(neighborColIdx, neighborRowIdx);
                } else if (neighborCell.adjMineCount > 0) {
                    neighborCell.click = true;
                }
            }
        }
    });
    render();
}
    
function checkSquare(colIdx, rowIdx) {
    let count = 0;
    if (rowIdx < 0 || rowIdx > (rows - 1) || colIdx < 0 || colIdx > (columns - 1)) {
        return 0;
    }
    if (minefield[colIdx][rowIdx].isMine == true) {
         count++;
    }
    return count;
}

function setAdjacentMineCount() {
    for (c = 0; c < columns; c++) {
        for (r = 0; r < rows; r++) {
            checkAdjacentMines(c, r);
        }
    }
};

function renderMinefield() {
    minefield.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cell, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`;
            if (minefield[colIdx][rowIdx].isMine === true) {
                document.getElementById(cellId).style.backgroundColor = 'red';
            } else {
                document.getElementById(cellId).style.backgroundColor = 'lightgrey';
            }
            if (minefield[colIdx][rowIdx].markerStatus === true) {
                document.getElementById(cellId).style.backgroundColor = 'purple';
            }
            if (minefield[colIdx][rowIdx].click === true) {
                document.getElementById(cellId).style.backgroundColor = 'darkgrey';
            }
            if (minefield[colIdx][rowIdx].adjMineCount !== 0 && minefield[colIdx][rowIdx].click === true) {
                document.getElementById(cellId).innerText = minefield[colIdx][rowIdx].adjMineCount;
                document.getElementById(cellId).style.fontSize = '4vmin';
                document.getElementById(cellId).style.textAlign = 'center';
            }
        });
    });
}

// function renderMessage() {
//     if (winner === ) {
//         statusMessage.innerText = "You successfully marked each mine! You win!";
//     } else if (markerBank <= 10) {
//         statusMessage.innerText = "10 mines to mark. No time to waste!";
//     } else if (markerBank < 7) {
//         statusMessage.innerText = "Great start! You still have some work to do though.";
//     } else if (markerBank < 5) {
//         statusMessage.innerText = "Halfway there! Keep up the good work!";
//     } else if (markerBank < 3) {
//         statusMessage.innerText = "You're so close! Time to finish strong!";
//     }
// }