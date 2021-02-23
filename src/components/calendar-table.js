import React from 'react';
import CalendarHeaders from './calendar-headers';
import CalendarRows from './calendar-rows';

const CalendarTable = () => (
    <div className="google-calendar__table" aria-live="polite">
        <CalendarHeaders />
        <CalendarRows />
    </div>
);

export default CalendarTable;