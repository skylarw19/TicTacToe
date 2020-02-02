/*------Constants------*/

/*------Variables (state)------*/
let gameBoardArr, turn, winner, boardId, row, col, turnCount;

/*------Cached Element References------*/
const msg = document.getElementById('message');

/*------Event Listeners------*/
document.querySelector('.board').addEventListener('click',handleClick);

/*------Functions------*/
function init(){
    //initialize values of gameBoard array to be 0
    gameBoardArr=new Array(3);
    for (let i=0; i<gameBoardArr.length; i++){
        gameBoardArr[i] = new Array(3);
        for (let j=0; j<gameBoardArr.length;j++){
            gameBoardArr[i][j]=0;
        }
    }
    turnCount = 0;
    winner=0;
    turn = 1; //initialize turn to be P1 (X).
    msg.textContent='Player X, pick a square';
}

function handleClick(evt){
    //get the index of the squares clicked on
    boardId = evt.target.id;
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

    
    //getWinner();
    console.log(winner);
    console.log(turnCount);
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
    // let diagTotal1 =0;
    // diagTotal1 += gameBoardArr[0][0] + gameBoardArr[1][1] + gameBoardArr[2][2];
    // let diagTotal2 =0;
    // diagTotal1 += gameBoardArr[2][0] + gameBoardArr[1][1] + gameBoardArr[0][2];
    // if(diagTotal1 === 3 || diagTotal2 ===3){
    //     winner = 1; return winner;
    // } else if(diagTotal1 ===-3 || diagTotal2===-3){
    //     winner = -1; return winner;
    // }
}

function getWinner(){
    if (winner===1){
        msg.textContent = `Congratulations! Player X is the winner!`;
    } else if (winner === -1){
        msg.textContent = `Congratulations! Player O is the winner!`;
    } else return;
}

function render(boardId){
    let square =  document.getElementById(boardId);

    //change board
    if (gameBoardArr[row][col]===1){
        square.innerHTML = "X";   //using innerHTML cuz actually changing HTML of it. (if it were a button you'd change the txtContent)
    } else square.innerHTML = "O";

    //display player or winner message
    if (winner ===0){
        if (turnCount === 9){
            msg.textContent = 'This game is a draw.';
        } else if(turn === 1){
            msg.textContent = 'Player X, pick a square.';
        } else msg.textContent = 'Player O, pick a square.';
    } else if (winner===1){
        msg.textContent = `Congratulations! Player X is the winner!`;
    } else if (winner === -1){
        msg.textContent = `Congratulations! Player O is the winner!`;
    } else return;
}

init();

/*Psuedocode
initialize the board. 
- initialize game board array to 0
- for html, the boardid is the arrayindex
display message that player [x] to select square
user clicks square
handle square click 
- if gameBoardArray val = 0,
    if player X, add 1 into array
    else add -1 into the array

- render add X or O
check if win
play again button

document.getElementByID for the target
*/