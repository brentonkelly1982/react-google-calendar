import React, { createContext, useReducer, useMemo, useCallback } from 'react';
import { calendars, isLoading } from '../reducers/reducers';

const month = (new Date()).getMonth();
const year = (new Date()).getFullYear();

const initialState = {
    "isLoading": true,
    "month": month,
    "year": year,
    "calendars": {}
};

// https://stackoverflow.com/questions/55070044/i-have-built-a-global-state-redux-like-pattern-with-context-and-hooks-is-there
const combineReducers = (...reducers) => (prevState, value, ...args) => reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
);
const rootReducer = combineReducers(calendars, isLoading);

const Store = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    /*const thunkDispatch = useCallback(
        (action) =>
          typeof action === 'function'
            ? action(dispatch)
            : action,
        []
    );*/
    const store = useMemo(() => [state, dispatch], [state]);
    
    return (
        <State.Provider value={store}>
            {children}
        </State.Provider>
    );
};

export const State = createContext(initialState);
export default Store;