import React, { createContext, useCallback, useMemo, useReducer } from 'react';

import initialState from './initial-state'
import rootReducer from '../reducers/reducers';

const resolver = (state, dispatch) => action => {
    typeof action === 'function' ? action(state, dispatch) : dispatch(action);
}

const Store = ({children}) => {
    const [state, dispatchBase] = useReducer(rootReducer, initialState);
    const dispatch = useCallback(resolver(state, dispatchBase), [state]);
    
    return (
        <State.Provider value={[state, dispatch]}>
            {children}
        </State.Provider>
    );
};

export const State = createContext(initialState);
export default Store;