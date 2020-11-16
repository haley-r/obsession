import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'

import GameBoard from '../GameBoard/GameBoard';

const URL = 'ws://localhost:5000/websocket'


function Game() {
    // const [roomName, setRoomName] = useState("");
    // const [roomId, setRoomId] = useState("");
    // const currentRoom = useSelector(state => state.room);
    const [currentRoom, setCurrentRoom] = useState('hi');

//     const dispatch = useDispatch();

    return (
        <>
            {!currentRoom && 
                <div>
                    <h1>Welcome to Obsession Online!</h1>
                    <div>
                        <input type="text" placeholder="whatever you want" />
                        <button>start a game</button>
                    </div>
                    <div>
                        <input type="text" placeholder="your friends game id" />
                        <button>join a game</button>
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






//     return (
//         <>
//             {!currentRoom &&
//                 <div className="create">
//                     <div>
//                         <span>Create new room</span>
//                         <input type="text" placeholder="Room name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
//                         <button onClick={() => dispatch({ type: "CREATE_ROOM", roomName })}>Create</button>
//                     </div>
//                     <div>
//                         <span>Join existing room</span>
//                         <input type="text" placeholder="Room code" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
//                         <button onClick={() => dispatch({ type: "JOIN_ROOM", roomId })}>Join</button>
//                     </div>
//                 </div>
//             }

//             {currentRoom &&
//                 <ChatRoom />
//             }
//         </>
//     );
// }

// export default HomeComponent;