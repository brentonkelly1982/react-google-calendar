import React, { useContext } from 'react';
import { State } from '../store/store';

const CalendarAside = () => {
    const [state, dispatch] = useContext(State);
    const { calendars } = state;

    return (
        <aside className="google-calendar__aside">
            <h3 className="google-calendar__calendar-list-header">Calendars</h3>
            <ul className="google-calendar__calendar-list">
                {calendars.map((calendar, index) => {
                    return  <li className="google-calendar__calendar-list-item" key={index}>
                                <label className="google-calendar__calendar-toggle-label google-calendar--ally-hidden" for={"google-calendar__calendar-item-" + index}>Toggle {calendar.name} calendar</label>
                                <input type="checkbox" className="google-calendar__calendar-toggle" id={"google-calendar__calendar-item-" + index} />
                                <span className="google-calendar__calendar-color-swatch" style={{backgroundColor: calendar.color}}></span>
                                <span className="google-calendar__calendar-name">{calendar.name}</span>
                            </li>
                })}
            </ul>
        </aside>
    );
};

export default CalendarAside;