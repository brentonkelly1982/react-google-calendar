import React from 'react';

const CalendarDay = (props) => (
    <div className={(props.blankDayCell == "true") ? 'google-calendar__day google-calendar--empty-day' : 'google-calendar__day'}>
        {(props.blankDayCell == "true") ? '' : props.date}
    </div>
);

export default CalendarDay;