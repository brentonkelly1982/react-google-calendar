import React, { useEffect, useContext } from 'react';
import { State } from '../store/store';
import CalendarToolbar from './calendar-toolbar';
import CalendarContent from './calendar-content';
import calendarConfig from '../../dist/config/config.json';

const Calendar = () => {
    const [state, dispatch] = useContext(State);

    useEffect(() => {
        const month = (new Date()).getMonth();
        const year = (new Date()).getFullYear();
        const startTimeDate = (new Date(year, month, 1)).setHours(0, 0, 0, 0);
        const startTime = (new Date(startTimeDate)).toISOString();
        const endTimeDate = (new Date(year, month + 1, 0)).setHours(11, 59, 59);
        const endTime = (new Date(endTimeDate)).toISOString();

        let requests = calendarConfig.calendars.map(calendar => fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendar.id)}/events?orderBy=startTime&singleEvents=true&timeMin=${startTime}&timeMax=${endTime}&key=AIzaSyAEqKrKq0z4Hh9jmYxjkG0nE9089M9Q95k`));

        Promise.all(requests).then(responses => {
            return Promise.all(responses.map(response => response.json()));
        }).then(calendars => {
            calendars.forEach((calendar, index) => {
                dispatch({
                    type: 'SET_CALENDARS',
                    payload: [{
                        id: index,
                        name: calendar.summary,
                        color: calendarConfig.calendars[index].color,
                        events: calendar.items
                    }]
                });
            });
        }).catch(error => {
            console.log(error);
        });
    }, []);

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