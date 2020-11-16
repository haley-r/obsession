import Game from '../Game/Game'
import React, { useEffect } from 'react';
// import './App.css';

const URL = 'ws://localhost:5000/websocket'


function App() {

  const ws = new WebSocket(URL)

    useEffect(() => {
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('ws connected in App.js')
    }
    ws.onmessage = event => {
      // on receiving a message, update things based on whats in the message
      const message = JSON.parse(event.data)
      // then do something with the message
      console.log('message received in App.js is: ', message);
      // this.addMessage(message)
    }
    ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      // obviously would need to rewrite for funcitonal component, so do that later
      // this.setState({
      //     ws: new WebSocket(URL),
      // })
    }
  });

  return (
      <div className="App">
        <header className="App-header">
          <h1>Obsession</h1>
        </header>
        <Game />
      </div>
  );
}

export default App;