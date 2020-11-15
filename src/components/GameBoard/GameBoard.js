import React, { useState, useEffect } from 'react';

const URL = 'ws://localhost:5000/websocket'


function GameBoard() {
    const [userColor, setUserColor] = useState('');
    const [ivoryScore, setIvoryScore] = useState(0);
    const [brownScore, setBrownScore] = useState(0);

    // const [userScore, setUserScore] = useState(0);



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
            // console.log('message is: ', message);
            if (message.type === 'score-update'){
                console.log('message type is score update');
                setBrownScore(message.brownScore);
                setIvoryScore(message.ivoryScore);
            }
            
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
            {/* <h3>and your score is: { userScore } </h3> */}
            <h2>ivoryScore: { ivoryScore }</h2>
            <h2>brownScore: { brownScore }</h2>


            <p>make a move:</p>
            <button onClick={increaseScoreByOne}>increase score</button>
        </div>
    );
}

export default GameBoard;