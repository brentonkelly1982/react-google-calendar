import React, { useContext } from 'react';

import { State } from '../store/store';
import calendarConfig from '../../dist/config/config.json';
import { changeCalendar } from '../thunks/thunks';

const CalendarAside = () => {
    const [ state, dispatch ] = useContext(State);
    const { calendars } = state;

    return (
        <div className="google-calendar__aside">
            <h3 className="google-calendar__calendar-list-header">Calendars</h3>
            <ul className="google-calendar__calendar-list">
                
                { // BUILD EACH CALENDAR OPTION
                calendarConfig.calendars.map((calendar, index) => {
                    
                    // SET CHECKED STATE FOR THIS CALENDAR
                    let checkedState = false;
                    if(calendar.id in calendars) {
                        if(calendars[calendar.id].active) {
                            checkedState = true;
                        }
                    }

                    return  <li className="google-calendar__calendar-list-item" key={index}>
                                <label className="google-calendar__calendar-toggle-label google-calendar--ally-hidden" htmlFor={"google-calendar__calendar-item-" + index}>Toggle {calendar.name} calendar</label>
                                <input type="checkbox" className="google-calendar__calendar-toggle" id={"google-calendar__calendar-item-" + index} checked={checkedState} onChange={() => { dispatch(changeCalendar(calendar.id))}} data-calendar-id={calendar.id}  />
                                <span className="google-calendar__calendar-color-swatch" style={{backgroundColor: calendar.color}}></span>
                                <span className="google-calendar__calendar-name">{calendar.name}</span>
                            </li>
                })}
            </ul>
        </div>
    );
};

export default CalendarAside;