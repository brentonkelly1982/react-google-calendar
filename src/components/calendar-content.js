import React from 'react';
import CalendarTable from './calendar-table';
import CalendarAside from './calendar-aside';

const CalendarContent = ({ month, year, events }) => (
    <div className="google-calendar__content">
        <CalendarTable month={month} year={year} events={events} />
        <CalendarAside />
    </div>
);

export default CalendarContent;