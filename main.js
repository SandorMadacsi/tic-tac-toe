

function GameBoard(){
    const rows = 3;
    const collumns = 3;
    const board = [];

    //populating board with cells
    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < collumns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const dropMove = (move, player) => {
        
        let [row, column] = move;
        if(board[row][column] !== undefined && 
             board[row][column].getValue() === null
        ){
            board[row][column].addMove(player);
    
        }else{
            console.log('false move');
            return;
        };
        
    }

    const printBoard = () => {
        const boardWithValues = board.map((row) =>
        row.map((cell) => cell.getValue()));
        console.log(boardWithValues);
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
            token: 'x'
        },
        {
            name: player2,
            token: 'o'
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn.`);
    }

    const playRound  = (move) => {
        let [row , column] = move;
        console.log(`Dropping ${getActivePlayer().name}'s token into row: ${row}, column: ${column} ...`);
        board.dropMove(move,getActivePlayer().token);

        printRound();
        switchPlayer();
    }


    printRound();



    return{
        playRound,
        getActivePlayer
    };
}

const game = GameController();