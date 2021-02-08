import React from 'react';
import { buildCalendarRows } from '../actions/actions';

const CalendarRows = ({ month, year, events }) => (
    <div className="google-calendar__rows">
        {buildCalendarRows({ month: month, year: year, events: events })}
    </div>
);

export default CalendarRows;