
const winConditions = [
     [
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ],
    
    [
        [0,3,6],
        [1,4,7],
        [2.5,8]
    ],
    [
        [0,4,8],
        [2,4,6]
    ]

]


function GameBoard(){

    const board = [];

    //populating board with cells
    for(let i = 0; i < 9; i++){
            board.push(Cell());
    }

    const getBoard = () => {
      return board.map((cell) => cell.getValue());
    }

    const checkMove = move =>{
        if(board[move] !== undefined && 
            board[move].getValue() === null
       )return true;
       else
        return false;
       
    }

    const dropMove = (move, player) => {
            board[move].addMove(player);
    
    
    }

    const printBoard = () => {
     
        console.log(getBoard());
    }

    return{getBoard, dropMove,checkMove, printBoard};

}

function Cell(){

    let value = null;
    
    const addMove = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMove,
        getValue
    };
}

function GameController(
    player1 = "Player 1",
    player2 = "Player 2)"){

    const board = GameBoard();
   
    const players = [
        {
            name: player1,
            token: 'x',
            score: 0
        },
        {
            name: player2,
            token: 'o',
            score: 0
        }
    ];


    const setScore = (score) =>{
        activePlayer.score = score;
    }

    let activePlayer = players[0];
    let isPlaying = true;

    const switchPlayer = () => {
        activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0];
    };

    const getActivePlayer = () => activePlayer;

    const setState = () => {
        isPlaying = false;
    }

    const getState = () => isPlaying;

    const printRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn`);
        console.log("=================");
    }

    const playRound  = (move) => {
        
        
        if(board.checkMove(move)){
            console.log(`Dropping ${getActivePlayer().name}'s token into cell: ${move}`);
            board.dropMove(move,getActivePlayer().token);
            printRound();
            for(let winCon in winConditions){
                if(getState() == true){
                    checkRow(winConditions[winCon]);
                }else{
                    break;
                }
            }
            switchPlayer();
            return true;
        }else{
            return false;
        }
        
    }

    const playGame = () =>{

        while(getState()){
        let input = prompt(`${getActivePlayer().name} s choice: `);
        let validRound = playRound(input);
        if(!validRound){
            console.log("false input");
            input = prompt(`${getActivePlayer().name} s choice: `);
            validRound = playRound(input);
        }
    }
        console.log("game over");
}
    

    const checkRow = (rows) => {
        let currentBoard = board.getBoard();
        let currentRow = [];
        for(let row in rows){
            if(getState()){
                currentRow = rows[row];
                setScore(0);
                // console.log(currentRow);
                currentRow.forEach(element => {
                    if(currentBoard[element] === activePlayer.token){
                      setScore(activePlayer.score += 1);
                    }
                    
                });
                if(activePlayer.score == 3){
                     console.log(`${activePlayer.name} won`);
                    setState();
                }
            }
        }

    }

    printRound();

    return{
        playGame,
        getActivePlayer,
        isPlaying
    };
}

const game = GameController();
//game.playGame();
const boardDom = BoardDOM();
boardDom.showBoard();



    
function BoardDOM(){
    let canvas = document.querySelector('.canvas-container');
    let clearButton = document.querySelector('button');
    
    const showBoard = () =>{
        canvas.innerHTML="";
        for(let i = 0; i < 3; i++){
            let row = document.createElement('div');
            row.classList.add('unit-row');
        
            for(let j = 0; j < 3; j++){
            
                let unit = document.createElement('div');
                unit.classList.add('unit');
                unit.setAttribute('style', `width: 150px;
                                            height: 150px;
                                            background-color: "red"`);
                row.appendChild(unit);
            }
            canvas.appendChild(row);
        }
    }
    return{showBoard};


    // let units = document.querySelectorAll('.unit');
    // units.forEach(unit =>  unit.addEventListener('mouseover', fillIn));

}

