import React from 'react';

const CalendarDay = ({ blankDayCell, date, events }) => (
    <div className={(blankDayCell == "true") ? 'google-calendar__day google-calendar--empty-day' : 'google-calendar__day'}>
        {(blankDayCell == "true") ? '' : date}
        {(blankDayCell != "true" && events.length) ?
            <ul>
                {events.map((event, index) => {
                    return <li key={index}>{event.summary}</li>
                })}
            </ul>
            : ''
        }
    </div>
);

export default CalendarDay;