const Reducers = (state, action) => {
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

export default Reducers;