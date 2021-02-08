import React, { useState } from 'react';
import CalendarToolbar from './calendar-toolbar';
import CalendarContent from './calendar-content';
import calendarConfig from '../../dist/config/config.json';

const Calendar = () => {
    const thisMonth = (new Date()).getMonth();
    const thisYear = (new Date()).getFullYear();
    const [month, setMonth] = useState(thisMonth);
    const [year, setYear] = useState(thisYear);

    return (
        <div className="google-calendar__wrapper">
            <h1>React Google Calendar</h1>
            <CalendarToolbar month={month} />
            <CalendarContent month={month} year={year} />
        </div>
    )
};

export default Calendar;