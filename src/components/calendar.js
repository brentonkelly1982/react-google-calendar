import React, { useEffect, useState } from 'react';
import CalendarToolbar from './calendar-toolbar';
import CalendarContent from './calendar-content';
import calendarConfig from '../../dist/config/config.json';

const Calendar = () => {
    const [events, setEvents] = useState(null);
    const thisMonth = (new Date()).getMonth();
    const thisYear = (new Date()).getFullYear();
    const [month, setMonth] = useState(thisMonth);
    const [year, setYear] = useState(thisYear);

    useEffect(() => {
        const startTimeDate = (new Date(year, month, 1)).setHours(0, 0, 0, 0);
        const startTime = (new Date(startTimeDate)).toISOString();
        const endTimeDate = (new Date(year, month + 1, 0)).setHours(11, 59, 59);
        const endTime = (new Date(endTimeDate)).toISOString();

        // https://stackoverflow.com/questions/46241827/fetch-api-requesting-multiple-get-requests
        fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent("ht3jlfaac5lfd6263ulfh4tql8@group.calendar.google.com")}/events?orderBy=startTime&singleEvents=true&timeMin=${startTime}&timeMax=${endTime}&key=AIzaSyAEqKrKq0z4Hh9jmYxjkG0nE9089M9Q95k`)
            .then((response) => response.json())
            .then(setEvents);
    }, []);

    return (
        <div className="google-calendar__wrapper">
            <h1>React Google Calendar</h1>
            <CalendarToolbar month={month} />
            <CalendarContent month={month} year={year} events={(events != null) ? events.items : []} />
        </div>
    )
};

export default Calendar;