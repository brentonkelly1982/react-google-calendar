import React from 'react';
import { buildCalendarRows } from '../actions/actions';

const CalendarRows = ({ month, year }) => (
    <div className="google-calendar__rows">
        {buildCalendarRows({ month: month, year: year })}
    </div>
);

export default CalendarRows;