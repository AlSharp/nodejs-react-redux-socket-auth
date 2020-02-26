import React from 'react';
import {Provider} from 'react-redux';
import createStore from './store';

export default props => {
  return (
    <Provider store={createStore()}>
      <div>
        <h1>HOME</h1>
      </div>
    </Provider>
  )
}