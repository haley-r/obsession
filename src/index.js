import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

// I don't know if this is needed/if http will be used for this project? 
// but leaving it in just in case/to remind myself
const API_BASE = "http://localhost:5000";

//make a game reducer that holds room name, username, and the state of the board
//these seem like they should be broken up into multiple reducers
//but anyway
const gameReducer = (state = { 
                              room: null, 
                              boardState: {}, 
                              username: null 
                            }, action) => {
  switch (action.type) {
    case "CREATE_ROOM_SUCCESS":
      state.room = action.payload;
      break;
    case "JOIN_ROOM_SUCCESS":
      state.room = action.payload;
      break;
    case "SET_USERNAME":
      console.log('in set_username case with action: ', action);
      state.username = action.username;
      break;
    // case "UPDATE_CHAT_LOG":
    //   if (state.room !== null && action.update.roomId === state.room.id) {
    //     state.chatLog = [...state.chatLog, action.update.data];
    //   }
    //   break;
  }
  return state
}

// sagas
function* createRoom(action) {
  console.log('got to the create room saga');
  
  try {
    const response = yield axios.get(`${API_BASE}/`)
    console.log('response from basic get is: ', response);
    
    // yield put({ type: "CREATE_ROOM_SUCCESS", payload: response.data });
  } catch (error) {
    console.log('error!', error);
    
    // yield put({ type: "CREATE_ROOM_ERROR", error });
  }
}

function* joinRoom(action) {
  try {
    const response = yield axios.get(`${API_BASE}/room/${action.roomId}`)
    yield put({ type: "JOIN_ROOM_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "JOIN_ROOM_ERROR", error });
  }
}


function* watcherSaga() {
  yield takeEvery('CREATE_ROOM', createRoom);
  yield takeEvery('JOIN_ROOM', joinRoom);
}

// make instance of saga middleware
const sagaMiddleware = createSagaMiddleware();

//make a store
const storeInstance = createStore(
  gameReducer,
  applyMiddleware(logger, sagaMiddleware),
);

//run watcher saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);