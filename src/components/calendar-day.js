import React from 'react';

const CalendarDay = ({ blankDayCell, date, day, events }) => (
    <div className={(blankDayCell == "true") ? 'google-calendar__day google-calendar--empty-day' : 'google-calendar__day'} data-date={(blankDayCell != "true") ? date : ''} data-day={day}>
        {(blankDayCell == "true") ? '' : <span className="google-calendar__cell-date">{date}</span>}
        {(blankDayCell != "true" && events.length) ?
            <ul className="google-calendar__events" tabIndex="0">
                {events.map((event, index) => {
                    return <li className="google-calendar__event" key={index} style={{color: event.calendarColor}}>{event.summary}</li>
                })}
            </ul>
            : ''
        }
    </div>
);

export default CalendarDay;