export const setCalendar = props => ({
    type: "SET_CALENDAR",
    payload: props
});

export const setCalendarsFromStorage = props => ({
    type: "SET_CALENDARS_FROM_STORAGE",
    payload: props
});

export const setCalendarEvents = props => ({
    type: "SET_CALENDAR_EVENTS",
    payload: props
});

export const changeCalendarMonth = props => ({
    type: "CHANGE_CALENDAR_MONTH",
    payload: props
});

export const toggleCalendar = props => ({
    type: "TOGGLE_CALENDAR",
    payload: props
});

export const removeLoading = () => ({
    type: "REMOVE_LOADING"
});