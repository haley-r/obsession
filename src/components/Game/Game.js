import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import GameBoard from '../GameBoard/GameBoard';

const URL = 'ws://localhost:5000/websocket'


function Game() {
    const [createRoomInput, setCreateRoomInput] = useState("");
    const [joinRoomInput, setJoinRoomInput] = useState("");
    const currentRoom = useSelector(state => state.room);

    const dispatch = useDispatch();

    const ws = new WebSocket(URL)

    const createRoom=(input)=>{
        console.log('in createRoom with input: ', input);
        ws.send(JSON.stringify({
            roomName: input,
        }))
        
    }

    return (
        <>
            {!currentRoom && 
                <div>
                    <h3>do u want to start or join a game?</h3>
                    <div>
                        <input type="text" placeholder="name your room" value={createRoomInput} onChange={(event) => setCreateRoomInput(event.target.value)} />
                        <button onClick={() => createRoom(createRoomInput)}>create room</button>
                    </div>
                    <div>
                        <input type="text" placeholder="enter existing room name" value={joinRoomInput} onChange={(event) => setJoinRoomInput(event.target.value)}/>
                        <button onClick={() => dispatch({ type: "JOIN_ROOM", joinRoomInput })}>Join</button>
                    </div>
                    {/* <h2>All Rooms:</h2>
                    <p>maybe do a useEffect to get all the rooms from the server?</p>
                    <p>could map the results with 'join' buttons</p> */}
                </div>
            }
            {currentRoom &&
               <GameBoard />
            }
        </>
    );
}

export default Game;