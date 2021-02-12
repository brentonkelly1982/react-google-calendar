export const SET_CALENDAR = "SET_CALENDAR";
export const setCalendar = calendar => ({
    type: "SET_CALENDAR",
    payload: calendar
});

export const TOGGLE_CALENDAR = "TOGGLE_CALENDAR";
export const toggleCalendar = id => ({
    type: "TOGGLE_CALENDAR",
    payload: id
});

export const REMOVE_LOADING = "REMOVE_LOADING";
export const removeLoading = () => ({
    type: "REMOVE_LOADING"
});