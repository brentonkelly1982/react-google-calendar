import { changeCalendarMonth, setCalendar, setCalendarEvents, toggleCalendar } from '../actions/actions';

import calendarConfig from '../../dist/config/config.json';

export const changeCalendar = (id) => (state, dispatch) => {
    const { month, year, calendars } = state;

    // DEFINE TIME CONSTANTS
    const startTimeDate = (new Date(year, month, 1)).setHours(0, 0, 0, 0);
    const startTime = (new Date(startTimeDate)).toISOString();
    const endTimeDate = (new Date(year, month + 1, 0)).setHours(11, 59, 59);
    const endTime = (new Date(endTimeDate)).toISOString();

    // CHANGE CALENDAR METHOD
    // THE TOGGLED CALENDAR EXISTS IN THE STORE
    if(id in calendars) {

        // THE TOGGLED CALENDAR IS ACTIVE
        if(calendars[id].active) {

            // JUST TOGGLE THE ACTIVE STATE TO SHOW/HIDE
            dispatch(toggleCalendar(id));
        }
        
        // THE TOGGLED CALENDAR IS NOT ACTIVE
        else {

            // THERE ARE SAVED EVENTS FOR THIS MONTH/YEAR IN THE STORE
            if(month + "/" + year in calendars[id].events) {
                // JUST TOGGLE THE ACTIVE STATE TO SHOW/HIDE
                dispatch(toggleCalendar(id));
            }
            
            // THERE ARE NO SAVED EVENTS FOR THIS MONTH/YEAR
            else {
                // WE NEED TO REQUEST EVENTS FOR THIS MONTH/YEAR
                fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?orderBy=startTime&singleEvents=true&timeMin=${startTime}&timeMax=${endTime}&key=${calendarConfig.apiKey}`)
                .then(response => response.json()) // RETURN JSON
                .then((calendarData) => { // NOW DO WORK WITH THE DATA

                    // ADD THIS CALENDAR DATA TO THE STORE
                    dispatch(setCalendarEvents({
                        id: id,
                        events: { [month + "/" + year]: calendarData.items }
                    }));

                    // TOGGLE THE ACTIVE STATE TO SHOW/HIDE
                    dispatch(toggleCalendar(id));
                })
                .catch(error => { // SIMPLE ERROR CATCH
                    console.log(error);
                });
            }
        }
    }
    
    // THE TOGGLED CALENDAR DOES NOT EXIST IN THE STORE YET SO WE NEED TO GET IT
    else {
        // FETCH OUR CALENDAR DATA AND EVENTS FOR THIS MONTH/YEAR
        fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?orderBy=startTime&singleEvents=true&timeMin=${startTime}&timeMax=${endTime}&key=${calendarConfig.apiKey}`)
            .then(response => response.json()) // RETURN JSON
            .then((calendarData) => { // NOW DO WORK WITH THE DATA

                // SET THE COLOR FOR THIS CALENDAR
                const calendarColor = calendarConfig.calendars.filter(calendar => {
                    if(calendar.id == id) {
                        return calendar.color;
                    }
                })[0].color;
                
                // ADD THIS CALENDAR DATA TO THE STORE
                dispatch(setCalendar({
                    [id]: {
                        id: id,
                        active: true,
                        name: calendarData.summary,
                        color: calendarColor,
                        events: {
                            [month + "/" + year]: calendarData.items
                        }
                    }
                }));
            })
            .catch(error => { // SIMPLE ERROR CATCH
                console.log(error);
            });
    }
}

export const loadThisMonth = (e) => (state, dispatch) => {
    e.preventDefault();

    updateCalendar({ month: (new Date()).getMonth(), year: (new Date()).getFullYear() }, state, dispatch);
}

export const loadPreviousMonth = (e) => (state, dispatch) => {
    e.preventDefault();
    const previousMonth = (state.month - 1 < 0) ? 11 : state.month - 1;
    const previousYear = (previousMonth == 11) ? state.year - 1 : state.year;

    updateCalendar({ month: previousMonth, year: previousYear }, state, dispatch);
}

export const loadNextMonth = (e) => (state, dispatch) => {
    e.preventDefault();
    const nextMonth = (state.month + 1 > 11) ? 0 : state.month + 1;
    const nextYear = (nextMonth == 0) ? state.year + 1 : state.year;

    updateCalendar({ month: nextMonth, year: nextYear }, state, dispatch);
}

const updateCalendar = ({ month, year }, state, dispatch) => {
    const { calendars } = state;

    let calendarsNeedData = [];

    // CHECK TO SEE IF THERE IS DATA FOR EACH CALENDAR ALREADY IN THE STORE
    for(const [calendarKey, calendar] of Object.entries(calendars)) {
        if(!([month + "/" + year] in calendar.events) && calendar.active) {
            calendarsNeedData.push(calendar.id);
        }
    }

    if(calendarsNeedData.length) {
        // DEFINE OUR CONSTANTS
        const startTimeDate = (new Date(year, month, 1)).setHours(0, 0, 0, 0);
        const startTime = (new Date(startTimeDate)).toISOString();
        const endTimeDate = (new Date(year, month + 1, 0)).setHours(11, 59, 59);
        const endTime = (new Date(endTimeDate)).toISOString();

        // NOW BUILD OUR FETCH REQUESTS
        const requests = calendarsNeedData.map(id => fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?orderBy=startTime&singleEvents=true&timeMin=${startTime}&timeMax=${endTime}&key=${calendarConfig.apiKey}`));

        // EXECUTE OUR REQUESTS
        Promise.all(requests).then(responses => {
            return Promise.all(responses.map(response => response.json()));
        })
        .then(responses => {
            // ITERATE OVER THE RETURNED CALENDARS
            responses.forEach((calendar, index) => {

                if(!(calendarsNeedData[index] in calendars)) {
                    // SET THE COLOR FOR THIS CALENDAR
                    const calendarColor = calendarConfig.calendars.filter(calendar => {
                        if(calendar.id == calendarIDs[index]) {
                            return calendar.color;
                        }
                    })[0].color;

                    // ADD THIS CALENDAR DATA TO THE STORE
                    dispatch(setCalendar({
                        [calendarsNeedData[index]]: {
                            id: calendarsNeedData[index],
                            active: true,
                            name: calendar.summary,
                            color: calendarColor,
                            events: {
                                [month + "/" + year]: calendar.items
                            }
                        }
                    }));
                } else {

                    // ADD THIS CALENDAR DATA TO THE STORE
                    dispatch(setCalendarEvents({
                        id: calendarsNeedData[index],
                        events: { [month + "/" + year]: calendar.items }
                    }));
                }
            });

            dispatch(changeCalendarMonth({ month: month, year: year }));
        })
        .catch(error => { // SIMPLE ERROR CATCH
            console.log(error);
        });
    } else {
        dispatch(changeCalendarMonth({ month: month, year: year }));
    }
    
}