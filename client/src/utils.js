import {useState} from 'react';

export const getURI = (hostname, port) => `http://${hostname}:${port}`;

export const useMergeState = initialState => {
  const [state, setState] = useState(initialState);
  const setMergedState = nextState =>
    setState(prevState => Object.assign({}, prevState, nextState));
  return [state, setMergedState];
}