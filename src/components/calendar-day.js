import React from 'react';

const CalendarDay = ({ blankDayCell, date, day, month, year, events, isToday }) => {
    const convertTime = time => {
        const eventTime = time.split(":");
        const hour = (parseInt(eventTime[0]) > 12) ? parseInt(eventTime[0]) - 12 : parseInt(eventTime[0]);
        const minutes = eventTime[1];
        const ampm = (parseInt(eventTime[0]) > 12) ? 'pm' : 'am';
    
        return hour + ":" + minutes + ampm;
    }

    return (
        <div className={((blankDayCell == "true") ? 'google-calendar__day google-calendar--empty-day' : 'google-calendar__day') + ((isToday) ? ' google-calendar--is-today' : '')} data-date={(blankDayCell != "true") ? date : ''} data-day={day} data-month={month}>
            {(blankDayCell == "true") ? '' : <span className="google-calendar__cell-date"><span>{day + ', ' + month} </span>{date}</span>}
            {(blankDayCell != "true" && events.length) ?
                <ul className="google-calendar__events" tabIndex="0" aria-label={`Calendar events for ${day}, ${month} ${date}, ${year}`}>
                    {events.map((event, index) => {
                        let startTime = ('dateTime' in event.start) ? convertTime((((event.start.dateTime.split("T"))[1]).split("-"))[0]) : '';
                        let endTime = ('dateTime' in event.end) ? convertTime((((event.end.dateTime.split("T"))[1]).split("-"))[0]) : '';
                        
                        return (
                            <li className="google-calendar__event" key={index} style={{color: event.calendarColor}}>
                                <div className="google-calendar__event-title">
                                    <a href={event.htmlLink} target="_blank" className="google-calendar__event-title-link">{event.summary}</a>
                                </div>
                                {(startTime != '') ? <div className="google-calendar__event-time">{startTime + " - " + endTime}</div> : ''}
                            </li>
                        );
                    })}
                </ul>
                : ''
            }
        </div>
    );
}

export default CalendarDay;