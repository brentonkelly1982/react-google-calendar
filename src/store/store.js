import React, { createContext, useReducer } from 'react';
import Calendars from '../reducers/reducers';

const month = (new Date()).getMonth();
const year = (new Date()).getFullYear();

const initialState = {
    "loading": true,
    "month": month,
    "year": year,
    "calendars": []
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Calendars, initialState);

    return (
        <State.Provider value={[state, dispatch]}>
            {children}
        </State.Provider>
    );
};

export const State = createContext(initialState);
export default Store;