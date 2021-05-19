import initialState from '../store/initial-state';

const calendars = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'SET_CALENDAR': {
            return {
                ...state,
                calendars: { ...state.calendars, ...payload }
            }
        }

        case 'SET_CALENDARS_FROM_STORAGE': {
            return {
                ...state,
                calendars: payload
            }
        }

        case 'SET_CALENDAR_EVENTS': {
            return {
                ...state,
                calendars: {
                    ...state.calendars,
                    [payload.id]: {
                        ...state.calendars[payload.id],
                        events: { ...state.calendars[payload.id].events, ...payload.events }
                    }
                }
            }
        }

        case 'CHANGE_CALENDAR_MONTH': {
            return {
                ...state,
                month: payload.month,
                year: payload.year
            }
        }

        case 'TOGGLE_CALENDAR': {
            return {
                ...state,
                calendars: {
                    ...state.calendars,
                    [payload]: {
                        ...state.calendars[payload],
                        active: (state.calendars[payload].active) ? false : true
                    }
                }
            }
        }

        default: {
            return state;
        }
    }
}

const isLoading = (state = initialState, action) => {
    const { type } = action;

    switch(type) {
        case 'REMOVE_LOADING': {
            return {
                ...state,
                isLoading: false
            }
        }

        default: {
            return state;
        }
    }
}

// https://stackoverflow.com/questions/55070044/i-have-built-a-global-state-redux-like-pattern-with-context-and-hooks-is-there
const combineReducers = (...reducers) => (prevState, value, ...args) => reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
);
const rootReducer = combineReducers(calendars, isLoading);
export default rootReducer;