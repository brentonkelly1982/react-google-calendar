import React from 'react';
import CalendarHeaders from './calendar-headers';
import CalendarRows from './calendar-rows';

const CalendarTable = ({ month, year, events }) => (
    <div className="google-calendar__table">
        <CalendarHeaders />
        <CalendarRows month={month} year={year} events={events} />
    </div>
);

export default CalendarTable;