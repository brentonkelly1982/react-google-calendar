import { SET_CALENDAR, TOGGLE_CALENDAR, REMOVE_LOADING } from '../actions/actions2';

export const calendars = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_CALENDAR: {
            return {
                ...state,
                calendars: state.calendars.concat(payload)
            }
        }
        case TOGGLE_CALENDAR: {
            return {
                ...state,
                calendars: state.calendars.map(calendar => {
                    if(calendar.id == payload.id) {
                        return {
                            ...calendar,
                            active: (calendar.active) ? false : true
                        }
                    }
                })
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