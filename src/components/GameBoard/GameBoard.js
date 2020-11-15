import React, { useState } from 'react';

function GameBoard() {
    const [currentPlayer, setCurrentPlayer] = useState('Player 1');
    const [player1score, setPlayer1score] = useState(0);
    const [player2score, setPlayer2score] = useState(0);
    const [winner, setWinner] = useState();

    const updateScore =(thePlayerWhoClicked)=> {
        console.log('updating score');
        if (thePlayerWhoClicked === 'Player 1') {
            setPlayer1score(player1score+1)
        } else if  (thePlayerWhoClicked === 'Player 2') {
            setPlayer2score(player2score+1)
        }
        checkForWinner()
    }
    const checkForWinner =()=>{
        if (player1score >= 12){
            setWinner('Player 1');
        } else if (player2score >= 12){
            setWinner('Player 2');
        }
    }
    const endTurn = (currentPlayer) => {
        console.log('ending turn');
        if (currentPlayer === 'Player 1'){
            setCurrentPlayer('Player 2')
        }else{
            setCurrentPlayer('Player 1')
        }
    }

    const newGame = () => {
        console.log('new game');
        setCurrentPlayer('Player 1');
        setPlayer1score(0);
        setPlayer2score(0);
        setWinner();
    }

    return (
        <div>
            {winner ?
            <div>
                <h2>The winner is: { winner }</h2>
                <button onClick = { () => newGame() }>Play Again</button>
            </div>
            :
            <div>
                <h2>Current Player: {currentPlayer}</h2>
                <h3>Player 1</h3>
                <p>score: {player1score}</p>
                <button onClick={() => updateScore('Player 1')}>Click to Score</button>
                <button onClick={() => endTurn('Player 1')}>End Turn</button>
                <h3>Player 2</h3>
                <p>score: {player2score}</p>
                <button onClick={() => updateScore('Player 2')}>Click to Score</button>
                <button onClick={() => endTurn('Player 2')}>End Turn</button>
            </div>
            }
        </div>
    );
}

export default GameBoard;