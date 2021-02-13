export const SET_CALENDAR = "SET_CALENDAR";
export const setCalendar = props => ({
    type: "SET_CALENDAR",
    payload: props
});

export const SET_CALENDARS_FROM_STORAGE = "SET_CALENDARS_FROM_STORAGE";
export const setCalendarsFromStorage = props => ({
    type: "SET_CALENDARS_FROM_STORAGE",
    payload: props
});

export const SET_CALENDAR_EVENTS = "SET_CALENDAR_EVENTS";
export const setCalendarEvents = props => ({
    type: "SET_CALENDAR_EVENTS",
    payload: props
});

export const CHANGE_CALENDAR_MONTH = "CHANGE_CALENDAR_MONTH";
export const changeCalendarMonth = props => ({
    type: "CHANGE_CALENDAR_MONTH",
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