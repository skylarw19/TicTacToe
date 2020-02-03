/*------Constants------*/

/*------Variables (state)------*/
let gameBoardArr, turn, winner, boardId, row, col, turnCount, isGameOver;

/*------Cached Element References------*/
const msg = document.getElementById('message');
const replayBtn = document.getElementsByTagName('button')[0]; //gets collection since ElementS, so use index 0 for the first (and only in this case)
const board = document.querySelector('section.board');

/*------Event Listeners------*/
board.addEventListener('click',handleClick);
replayBtn.addEventListener('click',replay);

/*------Functions------*/
function replay(){
    //clear game board - could use a loop to go thru this
    document.getElementById('sq00').innerHTML = "";
    document.getElementById('sq01').innerHTML = "";
    document.getElementById('sq02').innerHTML = "";
    document.getElementById('sq10').innerHTML = "";
    document.getElementById('sq11').innerHTML = "";
    document.getElementById('sq12').innerHTML = "";
    document.getElementById('sq20').innerHTML = "";
    document.getElementById('sq21').innerHTML = "";
    document.getElementById('sq22').innerHTML = "";
    init();

    
}

function init(){
    //initialize values of gameBoard array to be 0
    isGameOver = false;
    gameBoardArr=new Array(3);
    for (let i=0; i<gameBoardArr.length; i++){
        gameBoardArr[i] = new Array(3);
        for (let j=0; j<gameBoardArr.length;j++){
            gameBoardArr[i][j]=0;
        }
    }
    turnCount = 0;
    winner=0;
    turn = 1; //initialize turn to be Player X
    msg.textContent='Player X, pick a square'; //render message for Player X to start
}

function handleClick(evt){
    boardId = evt.target.id; //get the index of the squares clicked on
    row = parseInt(boardId[2]);
    col = parseInt(boardId[3]);
    
    //change value of gameArray to 1 or -1
    if(winner !== 0){ //do nothing if someone wins
        return;
    } else if (gameBoardArr[row][col]===0){ //if sq is empty
        if (turn ===1){
            gameBoardArr[row][col] = 1;
        } else gameBoardArr[row][col] = -1;
    } else return; //do nothing if gameBoardArr value !== 0 b/c it's already taken
    turn *= -1;
    turnCount++;
    checkWinner();
    render(boardId);
}

function checkWinner(){
    //check row totals
    for (let i=0; i<gameBoardArr.length; i++){
        let rowSum=0;
        for (let j=0; j<gameBoardArr[i].length;j++){
            rowSum+=gameBoardArr[i][j];
        }
        if (rowSum === 3){
            winner = 1; return winner;
        }else if (rowSum === -3){
            winner = -1; return winner;
        }
    }
    //check column totals
    for (let j=0; j<gameBoardArr.length; j++){
        let colSum=0;
        for(let i=0; i<gameBoardArr[j].length; i++){
            colSum+= gameBoardArr[i][j];
        }
        if (colSum === 3){
            winner = 1; return winner;
        }else if (colSum === -3){
            winner = -1; return winner;
        }
    }
    //check diagonal totals
    let diagTotal1 =0;
    diagTotal1 += gameBoardArr[0][0] + gameBoardArr[1][1] + gameBoardArr[2][2];
    let diagTotal2 =0;
    diagTotal2 += gameBoardArr[2][0] + gameBoardArr[1][1] + gameBoardArr[0][2];
    if(diagTotal1 === 3 || diagTotal2 ===3){
        winner = 1; return winner;
    } else if(diagTotal1 ===-3 || diagTotal2===-3){
        winner = -1; return winner;
    }
}

function render(boardId){
    let square =  document.getElementById(boardId);
    if (gameBoardArr[row][col]===1){ //change board
        square.innerHTML = "X";   //using innerHTML cuz actually changing HTML of it. (if it were a button you'd change the txtContent)
    } else square.innerHTML = "O";

    //render message
    if (winner ===0){
        if (turnCount === 9){
            msg.textContent = 'This game is a draw.';
            isGameOver = true;
        } else if(turn === 1){
            msg.textContent = 'Player X, pick a square.';
        } else msg.textContent = 'Player O, pick a square.';
    } else if (winner===1){
        msg.textContent = `Congratulations! Player X is the winner!`;
        isGameOver = true;
    } else if (winner === -1){
        msg.textContent = `Congratulations! Player O is the winner!`;
        isGameOver = true;
    } else return;
}

init();