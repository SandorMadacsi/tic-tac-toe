
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

    const dropMove = (move, player) => {
        
        if(board[move] !== undefined && 
             board[move].getValue() === null
        ){
            board[move].addMove(player);
    
        }else{
            console.log('false move');
            return;
        };
        
    }

    const printBoard = () => {
     
        console.log(getBoard());
    }

    return{getBoard, dropMove, printBoard};

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
        console.log(`${activePlayer.name}'s score: ${activePlayer.score}`);
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
        console.log(`${activePlayer.name}'s turn.`);
    }

    const playRound  = (move) => {
        
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

        // checkRow(rows);
        // checkRow(columns);
        // checkRow(diag);
       // switchPlayer();
      
    
        
    }

    const playGame = () =>{
        while(getState()){
        let input = prompt(`${getActivePlayer().name} s choice: `);
        playRound(input);
        }
        console.log("game over");
}
    

    const checkRow = (rows) => {
        let currentBoard = board.getBoard();
        let currentRow = [];
        for(let i = 0; i < rows.length; i++){
            currentRow = rows[i];
            setScore(0);
            console.log(currentRow);
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


    printRound();

    return{
        playGame,
        getActivePlayer,
        isPlaying
    };
}

const game = GameController();
game.playGame();

    
