/* -------- constants -------- */




/*-------- state variables --------*/
let minefield;
let mines;
let numberHints;
let win;
let loss;


/*-------- cached elements --------*/
const markerBank = document.getElementById('marker-bank');
const statusMessage = document.querySelector('h1');
const resetBtn = document.querySelector('button');
const timer = document.getElementById('timer');


/*-------- event listeners --------*/
document.getElementById('minefield').addEventListener('click', clearSquare);
document.getElementById('minefield').addEventListener('contextmenu', function(e) {e.preventDefault();});
resetBtn.addEventListener('click', init);


/*-------- functions --------*/
init();

function init() {
    minefield = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    mines = 10;
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
    render();
}

function clearSquare() {

    render();
}

function render() {
    renderMinefield();
    renderMessage();
}

function renderMinefield() {
    let minePlacement = document.getElementById('minefield');
    for (let i = 0; i < 10; i++) {
        const mine = document.createElement('div');
        mine.className = 'mine' + i;
        minefield.appendChild(mine);
    }
    let placedMines = [];
    while (placedMines.length < 10) {
        let randomIndex = parseInt(10 * Math.random());
        if (placedMines.indexOf(randomIndex) === -1) {
            placedMines.push(randomIndex);
            document.getElementById('mine' + randomIndex).style.backgroundColor = 'red';
        }
    }
}