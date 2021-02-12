import React from 'react';
//import { buildCalendarRows } from '../thunks/thunks';
import { buildCalendarRows } from '../actions/actions';

const CalendarRows = () => (
    <div className="google-calendar__rows">
        {buildCalendarRows()}
    </div>
);

export default CalendarRows;