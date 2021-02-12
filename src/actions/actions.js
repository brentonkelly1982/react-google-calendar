export const SET_CALENDAR = "SET_CALENDAR";
export const setCalendar = props => ({
    type: "SET_CALENDAR",
    payload: props
});

export const SET_CALENDAR_EVENTS = "SET_CALENDAR_EVENTS";
export const setCalendarEvents = props => ({
    type: "SET_CALENDAR_EVENTS",
    payload: props
});

export const TOGGLE_CALENDAR = "TOGGLE_CALENDAR";
export const toggleCalendar = props => ({
    type: "TOGGLE_CALENDAR",
    payload: props
});

export const REMOVE_LOADING = "REMOVE_LOADING";
export const removeLoading = () => ({
    type: "REMOVE_LOADING"
});