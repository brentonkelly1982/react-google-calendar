import React, { useContext } from 'react';
import { State } from '../store/store';
import { setCalendar, toggleCalendar } from '../actions/actions';
import calendarConfig from '../../dist/config/config.json';

const CalendarAside = () => {
    const [state, dispatch] = useContext(State);

    const changeCalendar = (id) => {
        if(id in state.calendars) {
            if(state.calendars[id].active) {
                dispatch(toggleCalendar(id));
            } else {
                if(state.month + "/" + state.year in state.calendars[id].events) {
                    dispatch(toggleCalendar(id));
                } else {
                    console.log("need to fetch month data")
                }
            }
        } else {
            const startTimeDate = (new Date(state.year, state.month, 1)).setHours(0, 0, 0, 0);
            const startTime = (new Date(startTimeDate)).toISOString();
            const endTimeDate = (new Date(state.year, state.month + 1, 0)).setHours(11, 59, 59);
            const endTime = (new Date(endTimeDate)).toISOString();

            fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?orderBy=startTime&singleEvents=true&timeMin=${startTime}&timeMax=${endTime}&key=AIzaSyAEqKrKq0z4Hh9jmYxjkG0nE9089M9Q95k`)
                .then(response => response.json())
                .then((calendarData) => {
                    const calendarColor = calendarConfig.calendars.filter(calendar => {
                        if(calendar.id == id) {
                            return calendar.color;
                        }
                    })[0].color;
        
                    dispatch(setCalendar({
                        [id]: {
                            active: true,
                            name: calendarData.summary,
                            color: calendarColor,
                            events: {
                                [state.month + "/" + state.year]: calendarData.items
                            }
                        }
                    }));
                })
                .catch(console.error);
        }
    }

    return (
        <aside className="google-calendar__aside">
            <h3 className="google-calendar__calendar-list-header">Calendars</h3>
            <ul className="google-calendar__calendar-list">
                {calendarConfig.calendars.map((calendar, index) => {
                    let checkedState = false;
                    if(calendar.id in state.calendars) {
                        if(state.calendars[calendar.id].active) {
                            checkedState = true;
                        }
                    }

                    return  <li className="google-calendar__calendar-list-item" key={index}>
                                <label className="google-calendar__calendar-toggle-label google-calendar--ally-hidden" htmlFor={"google-calendar__calendar-item-" + index}>Toggle {calendar.name} calendar</label>
                                <input type="checkbox" className="google-calendar__calendar-toggle" id={"google-calendar__calendar-item-" + index} checked={checkedState} onChange={() => { changeCalendar(calendar.id)}}  />
                                <span className="google-calendar__calendar-color-swatch" style={{backgroundColor: calendar.color}}></span>
                                <span className="google-calendar__calendar-name">{calendar.name}</span>
                            </li>
                })}
            </ul>
        </aside>
    );
};

export default CalendarAside;