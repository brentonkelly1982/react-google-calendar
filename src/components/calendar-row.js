import React from 'react';
import { buildCalendarDays } from '../actions/actions';

const CalendarRow = (props) => (
    <div className="google-calendar__row">
        {buildCalendarDays(props.days)}
    </div>
);

export default CalendarRow;