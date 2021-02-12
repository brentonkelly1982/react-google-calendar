import { SET_CALENDAR, SET_CALENDAR_EVENTS, TOGGLE_CALENDAR, REMOVE_LOADING } from '../actions/actions';

export const calendars = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_CALENDAR: {
            return {
                ...state,
                calendars: {...state.calendars, ...payload}
            }
        }
        case SET_CALENDAR_EVENTS: {
            return {
                ...state,
                calendars: Object.keys(state.calendars).map((key, index) => {
                    if(payload.id == key) {
                        return Object.assign(payload.events, ...Object.values(state.calendars[payload].events))
                    }
                })
            }
        }
        case TOGGLE_CALENDAR: {
            return {
                ...state,
                calendars: {
                    ...state.calendars,
                    [payload]: {
                        ...state.calendars[payload],
                        active: (state.calendars[payload].active) ? false : true
                    }

                }
                /*calendars: Object.entries(state.calendars).map(([id, calendar], index) => {
                    if(id == payload) {
                        return {
                            ...calendar,
                            active: (calendar.active) ? false : true
                        }
                    }
                })*/
            }
        }
        default: {
            return state;
        }
    }
}

export const isLoading = (state, action) => {
    const { type } = action;

    switch(type) {
        case REMOVE_LOADING: {
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