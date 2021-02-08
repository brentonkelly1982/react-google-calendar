import React, { useState } from 'react';
import CalendarToolbar from './calendar-toolbar';
import CalendarHeaders from './calendar-headers';
import CalendarRows from './calendar-rows';
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
            <div className="google-calendar">
                <CalendarHeaders />
                <CalendarRows month={month} year={year} />
            </div>
        </div>
    )
};

export default Calendar;