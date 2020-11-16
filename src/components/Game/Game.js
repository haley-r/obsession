import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import GameBoard from '../GameBoard/GameBoard';

const URL = 'ws://localhost:5000/websocket'


function Game() {
    const [createRoomInput, setCreateRoomInput] = useState("");
    const [joinRoomInput, setJoinRoomInput] = useState("");
    const currentRoom = useSelector(state => state.room);

    const dispatch = useDispatch();

    return (
        <>
            {!currentRoom && 
                <div>
                    <h3>do u want to start or join a game?</h3>
                    <div>
                        <input type="text" placeholder="name your room" value={createRoomInput} onChange={(event) => setCreateRoomInput(event.target.value)} />
                        <button onClick={() => dispatch({ type: "CREATE_ROOM", createRoomInput })}>create room</button>
                    </div>
                    <div>
                        <input type="text" placeholder="enter existing room name" value={joinRoomInput} onChange={(event) => setJoinRoomInput(event.target.value)}/>
                        <button onClick={() => dispatch({ type: "JOIN_ROOM", joinRoomInput })}>Join</button>
                    </div>
                </div>
            }
            {currentRoom &&
               <GameBoard />
            }
        </>
    );
}

export default Game;