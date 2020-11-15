import React, { useState, useEffect } from 'react';

const URL = 'ws://localhost:5000/websocket'


function GameBoard() {
    const [currentPlayer, setCurrentPlayer] = useState('Player 1');
    const [player1score, setPlayer1score] = useState(0);
    const [player2score, setPlayer2score] = useState(0);
    const [winner, setWinner] = useState();

    const ws = new WebSocket(URL)

    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        ws.onmessage = event => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(event.data)
            // this.addMessage(message)
        }

        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.setState({
                ws: new WebSocket(URL),
            })
        }
    });

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




// class Chat extends Component {
//     state = {
//         name: 'Bob',
//         messages: [],
//     }

//.....

//     addMessage = message =>
//         this.setState(state => ({ messages: [message, ...state.messages] }))

//     submitMessage = messageString => {
//         // on submitting the ChatInput form, send the message, add it to the list and reset the input
//         const message = { name: this.state.name, message: messageString }
//         this.ws.send(JSON.stringify(message))
//         this.addMessage(message)
//     }

//     render() {
//         return (
//             <div>
//                 <label htmlFor="name">
//                     Name:&nbsp;
//           <input
//                         type="text"
//                         id={'name'}
//                         placeholder={'Enter your name...'}
//                         value={this.state.name}
//                         onChange={e => this.setState({ name: e.target.value })}
//                     />
//                 </label>
//                 <ChatInput
//                     ws={this.ws}
//                     onSubmitMessage={messageString => this.submitMessage(messageString)}
//                 />
//                 {this.state.messages.map((message, index) =>
//                     <ChatMessage
//                         key={index}
//                         message={message.message}
//                         name={message.name}
//                     />,
//                 )}
//             </div>
//         )
//     }
// }

// export default Chat