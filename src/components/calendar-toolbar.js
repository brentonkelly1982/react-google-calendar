import React, { useContext } from 'react';
import { setCalendar, setCalendarEvents, changeCalendarMonth } from '../actions/actions';
import { State } from '../store/store';
import calendarConfig from '../../dist/config/config.json';

const CalendarToolbar = () => {
    const [state, dispatch] = useContext(State);
    const { month, year } = state;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const loadThisMonth = () => {
        changeCalendar({ month: (new Date()).getMonth(), year: (new Date()).getFullYear() });
    }
    
    const loadPreviousMonth = () => {
        const previousMonth = (state.month - 1 < 0) ? 11 : state.month - 1;
        const previousYear = (previousMonth == 11) ? state.year - 1 : state.year;

        changeCalendar({ month: previousMonth, year: previousYear });
    }

    const loadNextMonth = () => {
        const nextMonth = (state.month + 1 > 11) ? 0 : state.month + 1;
        const nextYear = (nextMonth == 0) ? state.year + 1 : state.year;

        changeCalendar({ month: nextMonth, year: nextYear });
    }

    const changeCalendar = ({ month, year }) => {
        const { calendars } = state;

        let calendarsNeedData = [];

        // CHECK TO SEE IF THERE IS DATA FOR EACH CALENDAR ALREADY IN THE STORE
        for(const cal in calendars) {
            let calendar = calendars[cal];

            if(!(month + "/" + year in calendar.events) && calendar.active) {
                calendarsNeedData.push(calendar.id);
            }
        }

        if(calendarsNeedData.length) {
            // DEFINE OUR CONSTANTS
            const startTimeDate = (new Date(year, month, 1)).setHours(0, 0, 0, 0);
            const startTime = (new Date(startTimeDate)).toISOString();
            const endTimeDate = (new Date(year, month + 1, 0)).setHours(11, 59, 59);
            const endTime = (new Date(endTimeDate)).toISOString();

            // FILTER OUT ALL OF THE CALENDARS THAT ARE NOT SET TO SHOW INITIALLY
            let requests = calendarConfig.calendars.filter(calendar => {
                if(calendarsNeedData.includes(calendar.id)) {
                    return true;
                }
                return false;

            // NOW BUILD OUR FETCH REQUESTS
            }).map(calendar => fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendar.id)}/events?orderBy=startTime&singleEvents=true&timeMin=${startTime}&timeMax=${endTime}&key=AIzaSyAEqKrKq0z4Hh9jmYxjkG0nE9089M9Q95k`));

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

    return (
        <div className="google-calendar__toolbar">
            <h2>{months[month] + " " + year}</h2>
            <div className="google-calendar__navigation-controls">
                <a href="#" role="butotn" className="google-calendar__navigation-control google-calendar--today" onClick={() => { loadThisMonth() }}>Today</a>
                <a href="#" role="button" className="google-calendar__navigation-control google-calendar--back" onClick={() => { loadPreviousMonth() }}>Back</a>
                <a href="#" role="button" className="google-calendar__navigation-control google-calendar--next" onClick={() => { loadNextMonth() }}>Next</a>
            </div>
        </div>
    );
};

export default CalendarToolbar;