// const gameContainer = document.getElementById('game-container');
const display = document.getElementById('display');
const player1_Element= document.getElementById('player-1-score');
const player2_Element = document.getElementById('player-2-score');
const box = document.querySelectorAll('.box');
const resetBtn = document.getElementById('reset-btn');

let player1 = 'X';
let player2 = 'O'; 
let player1_Score = 0, player2_Score = 0;
let currentplayer = player1;
let winner = '';
let gameState = true; // is game still going?
let board = ['','','','','','','','',''];

const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

document.getElementById('game-container').addEventListener('click', (event) => {
    // selecting box
    const clickedBox = event.target.closest('.box');
    if(!clickedBox) return;
    
    updateBoard(clickedBox, currentplayer);
    // move(clickedBox, currentplayer);
    
})

function updateBoard(clickedBox, player){
    
    if(!gameState) return;

    if(currentplayer == player1 && board[parseInt(clickedBox.dataset.index)] == ''){
        
        clickedBox.innerHTML = player;
        board[parseInt(clickedBox.dataset.index)] = player;
        currentplayer = player2;
        display.innerHTML = 'Turn : player 2';

    } else if(currentplayer == player2 && board[parseInt(clickedBox.dataset.index)] == '') {
        
        clickedBox.innerHTML = player;
        board[parseInt(parseInt(clickedBox.dataset.index))] = player;
        currentplayer = player1;
        display.innerHTML = 'Turn : player 1';

    } else {
        return;
    }
    
    checkBoard();
}

function checkBoard(){

    for(const combo of winningCombination){
        const [a, b, c] = combo;
        if(board[a] !== '' && board[a] === board[b] && board[b] === board[c]){
            winner = board[a];
            console.log(winner);
            
            highlightBox(combo);

            if(currentplayer!==player1){
                display.innerHTML = 'Player 1 Wins🎉🎉';
                player1_Score++;
                player1_Element.innerHTML = `Player 1 Score : ${player1_Score}`;
            } else {
                display.innerHTML = 'Player 2 Wins🎉🎉';
                player2_Score++;
                player2_Element.innerHTML = `Player 2 Score : ${player2_Score}`;
            }

            gameState = false;
            return;
        }
    }
    if(!board.includes('')){
        display.innerHTML = 'Draw';
    };
}

resetBtn.addEventListener('click', () => {
    box.forEach((element, index) =>{
        element.innerHTML = '';
        board[index] = '';
        display.innerHTML = 'Cleared!!👍';
        box[index].classList.toggle('combo-boxes', false);
    })
    gameState = true;

})

function highlightBox(combo){

    for(c of combo){
        box[c].classList.add('combo-boxes');
    }        
}
