import React, { useContext } from 'react';
import { State } from '../store/store';

const CalendarAside = () => {
    const [state, dispatch] = useContext(State);
    const { calendars } = state;

    return (
        <aside className="google-calendar__aside">
            <h3>Calendars</h3>
            <ul className="google-calendar__calendar-list">
                {calendars.map((calendar, index) => {
                    return <li className="google-calendar__calendar-list-item" key={index}>{calendar.name}</li>
                })}
            </ul>
        </aside>
    );
};

export default CalendarAside;