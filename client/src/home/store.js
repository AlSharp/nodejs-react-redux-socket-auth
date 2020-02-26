import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import socketIOClient from 'socket.io-client';

import reducers from './reducers';

export default () => {
  const SERVER_ADDRESS = process.env.NODE_ENV === 'development' ?
  `http://${window.location.hostname}:5000` :
  '/';
  const socket = socketIOClient(SERVER_ADDRESS);

  const socketIOMiddleware = socket => store => next => action => {
    switch(action.type) {
      case 'ACTION_1':
        next(action);
        break;
      default:
        next(action);
    }
  }

  let middlewares = [
    thunk,
    socketIOMiddleware(socket)
  ];

  if (process.env.NODE_ENV !== 'production') {
    const logger = require('redux-logger').createLogger();
    middlewares = [...middlewares, logger];
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  return createStore(
    reducers,
    middlewareEnhancer
  );
}

