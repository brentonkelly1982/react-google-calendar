const month = (new Date()).getMonth();
const year = (new Date()).getFullYear();

const initialState = {
    "isLoading": true,
    "month": month,
    "year": year,
    "calendars": {}
};

export default initialState;