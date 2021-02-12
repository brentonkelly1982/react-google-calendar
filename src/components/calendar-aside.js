import React, { useContext } from 'react';
import { State } from '../store/store';
import calendarConfig from '../../dist/config/config.json';

const CalendarAside = () => {
    const [state, dispatch] = useContext(State);

    return (
        <aside className="google-calendar__aside">
            <h3 className="google-calendar__calendar-list-header">Calendars</h3>
            <ul className="google-calendar__calendar-list">
                {calendarConfig.calendars.map((calendar, index) => {
                    let checkedState = (index in state.calendars) ? state.calendars[index].active : false;
                    return  <li className="google-calendar__calendar-list-item" key={index}>
                                <label className="google-calendar__calendar-toggle-label google-calendar--ally-hidden" htmlFor={"google-calendar__calendar-item-" + index}>Toggle {calendar.name} calendar</label>
                                <input type="checkbox" className="google-calendar__calendar-toggle" id={"google-calendar__calendar-item-" + index} checked={checkedState} onChange={() => { dispatch({ type:"TOGGLE_CALENDAR", payload: { id: index }})}}  />
                                <span className="google-calendar__calendar-color-swatch" style={{backgroundColor: calendar.color}}></span>
                                <span className="google-calendar__calendar-name">{calendar.name}</span>
                            </li>
                })}
            </ul>
        </aside>
    );
};

export default CalendarAside;