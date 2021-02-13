import { SET_CALENDAR, SET_CALENDARS_FROM_STORAGE, SET_CALENDAR_EVENTS, CHANGE_CALENDAR_MONTH, TOGGLE_CALENDAR, REMOVE_LOADING } from '../actions/actions';

export const calendars = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_CALENDAR: {
            return {
                ...state,
                calendars: { ...state.calendars, ...payload }
            }
        }

        case SET_CALENDARS_FROM_STORAGE: {
            return {
                ...state,
                calendars: payload
            }
        }

        case SET_CALENDAR_EVENTS: {
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

        case CHANGE_CALENDAR_MONTH: {
            return {
                ...state,
                month: payload.month,
                year: payload.year
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