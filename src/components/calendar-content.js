import React from 'react';
import CalendarTable from './calendar-table';
import CalendarAside from './calendar-aside';

const CalendarContent = () => (
    <div className="google-calendar__content">
        <CalendarTable />
        <CalendarAside />
    </div>
);

export default CalendarContent;