
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
    player1 =  "Player 1",
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
        console.log(move);
        console.log(board.checkMove(move));
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

    // const playGame = (input) =>{

    //     while(getState()){
    //     //let input = prompt(`${getActivePlayer().name} s choice: `);
    //     let validRound = playRound(input);
    //         if(!validRound){
    //             console.log("false input");
    //            // input = prompt(`${getActivePlayer().name} s choice: `);
    //             validRound = playRound(input);
    //         }
    //     }
    //     console.log("game over");
    // }
    

    const checkRow = (rows) => {
        let currentBoard = board.getBoard();
        let currentRow = [];
        for(let row in rows){
            if(getState()){
                currentRow = rows[row];
                setScore(0);
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
        playRound,
        getBoard : board.getBoard,
        getActivePlayer,
        isPlaying
    };
}




    
function BoardDOM(){
    let canvas = document.querySelector('.canvas-container');
    let player1 = prompt("Enter your name for player 1 ");
    let player2 = prompt("Enter your name for player 2 ");
    player1Dom.innerText = "Player 1: ";
    player2Dom.innerText = "Player 2: ";

    let player1Dom = document.getElementById("player1");
    let player2Dom = document.getElementById("player2");

    player1Dom.innerText += player1;
    player2Dom.innerText += player2;

    const game = GameController(player1, player2);
  
    const displayBoard = () =>{

        const board = game.getBoard();

        canvas.innerHTML="";
        canvas.setAttribute('style', `display:grid;
                                      grid-template-columns:repeat(3, 1fr)`);


                    
        board.forEach((cell , i) => {

            let unit = document.createElement('div');
            unit.id = i;
            let valContainer = document.createElement('div');
            unit.classList.add('unit');
            let value = document.createElement('h1');
            value.innerHTML = "Test";

            valContainer.appendChild(value);
            valContainer.classList.add('valConainer');
            unit.setAttribute('style', `width: 100%;
                                        height: 100%;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;`);

            valContainer.setAttribute('style',`
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        width: 150px;
                                        height: 150px;
                                        `);

            value.setAttribute('style',`
            font-size:180px;
            `);
            unit.appendChild(valContainer);
        


            canvas.appendChild(unit);
            unit.addEventListener('click',clickMove);
            value.innerText= cell;
        });
       

    
  
    }

        function clickMove(e){

            const selectedDiv = Number(e.currentTarget.id);
            console.log(selectedDiv);

            if(selectedDiv !==0 && !selectedDiv){
                console.log("the field is taken");
                return;
            } 

            game.playRound(selectedDiv);
            displayBoard();
        }


    displayBoard();

}
BoardDOM();

