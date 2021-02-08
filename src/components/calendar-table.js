import React from 'react';
import CalendarHeaders from './calendar-headers';
import CalendarRows from './calendar-rows';

const CalendarTable = ({ month, year }) => (
    <div className="google-calendar__table">
        <CalendarHeaders />
        <CalendarRows month={month} year={year} />
    </div>
);

export default CalendarTable;