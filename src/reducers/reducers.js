export const calendars = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case "SET_CALENDARS": {
            return {
                ...state,
                calendars: state.calendars.concat(payload)
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
        case "REMOVE_LOADING" : {
            console.log(state.isLoading);
            console.log(() => !state.isLoading);
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