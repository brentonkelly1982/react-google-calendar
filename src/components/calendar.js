import React, { useEffect, useContext } from 'react';
import { State } from '../store/store';
import { setCalendar, setCalendarsFromStorage, removeLoading } from '../actions/actions';
import CalendarToolbar from './calendar-toolbar';
import CalendarContent from './calendar-content';
import calendarConfig from '../../dist/config/config.json';

const Calendar = () => {
    const [state, dispatch] = useContext(State);
    const { month, year, calendars } = state;

    // GET AND SET OUR INITIAL DATA
    useEffect(() => {
        if(sessionStorage.getItem("google-calendar-events")) {
            // SET CALENDARS FROM STORAGE
            dispatch(setCalendarsFromStorage(JSON.parse(sessionStorage.getItem("google-calendar-events"))))

            // REMOVE THE LOADING STATE
            dispatch(removeLoading());
        } else {
            // DEFINE OUR CONSTANTS
            const month = (new Date()).getMonth();
            const year = (new Date()).getFullYear();
            const startTimeDate = (new Date(year, month, 1)).setHours(0, 0, 0, 0);
            const startTime = (new Date(startTimeDate)).toISOString();
            const endTimeDate = (new Date(year, month + 1, 0)).setHours(11, 59, 59);
            const endTime = (new Date(endTimeDate)).toISOString();

            // DEFINE THE ARRAY THAT IS GOING TO BE AN EASY REFERENCE TO RETRIEVE CALENDAR DATA LATER
            let calendarIDs = [];

            // FILTER OUT ALL OF THE CALENDARS THAT ARE NOT SET TO SHOW INITIALLY
            let requests = calendarConfig.calendars.filter(calendar => {
                if(calendar.showInitially) {
                    calendarIDs.push(calendar.id);
                    return true;
                }
                return false;

            // NOW BUILD OUR FETCH REQUESTS
            }).map(calendar => fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendar.id)}/events?orderBy=startTime&singleEvents=true&timeMin=${startTime}&timeMax=${endTime}&key=${calendarConfig.apiKey}`));

            if(requests) {

                // EXECUTE OUR REQUESTS
                Promise.all(requests).then(responses => {
                    return Promise.all(responses.map(response => response.json()));
                })
                .then(calendars => {
                    // ITERATE OVER THE RETURNED CALENDARS
                    calendars.forEach((calendar, index) => {

                        // SET THE COLOR FOR THIS CALENDAR
                        const calendarColor = calendarConfig.calendars.filter(calendar => {
                            if(calendar.id == calendarIDs[index]) {
                                return calendar.color;
                            }
                        })[0].color;

                        // ADD THIS CALENDAR DATA TO THE STORE
                        dispatch(setCalendar({
                            [calendarIDs[index]]: {
                                id: calendarIDs[index],
                                active: true,
                                name: calendar.summary,
                                color: calendarColor,
                                events: {
                                    [month + "/" + year]: calendar.items
                                }
                            }
                        }));

                        // REMOVE THE LOADING STATE
                        dispatch(removeLoading());
                    });
                })
                .catch(error => { // SIMPLE ERROR CATCH
                    console.log(error);
                });
            }
        }
    }, []);

    // SET LOCAL STORAGE
    useEffect(() => {
        if(Object.keys(calendars).length != 0) {
            sessionStorage.setItem('google-calendar-events', JSON.stringify(calendars));
        }
    }, [calendars]);

    return (
        <div className="react-google-calendar">
            <div className="google-calendar__wrapper">
                <h1 className="google-calendar__title">React Google Calendar</h1>
                <CalendarToolbar />
                <CalendarContent />
            </div>
        </div>
    )
};

export default Calendar;