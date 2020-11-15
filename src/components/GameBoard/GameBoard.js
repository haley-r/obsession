import React, { useState, useEffect } from 'react';

const URL = 'ws://localhost:5000/websocket'


function GameBoard() {
    const [userColor, setUserColor] = useState('');
    const [userScore, setUserScore] = useState(0);


    const ws = new WebSocket(URL)

    const setColor =(color)=>{
        console.log('you are choosing to play as: ', color);
        setUserColor(color)
    }

    const increaseScoreByOne =()=>{
        console.log('hi from inside increasebyone');
        
        const move = { 
            color: userColor,
            type: "increase-score-by-1", 
            value: 1 
        }
        ws.send(JSON.stringify(move))
    }

    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        ws.onmessage = event => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(event.data)
            console.log('message is: ', message);
            
            // this.addMessage(message)
        }

        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            // this.setState({
            //     ws: new WebSocket(URL),
            // })
        }
    });



    return (
        <div>
            <button onClick={()=>setColor('ivory')}>Play as Ivory</button>
            <button onClick={() => setColor('brown')}>Play as Brown</button>

            <h2>you're playing as: { userColor }</h2>
            <h3>and your score is: { userScore } </h3>

            <p>make a move:</p>
            <button onClick={increaseScoreByOne}>increase score</button>
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