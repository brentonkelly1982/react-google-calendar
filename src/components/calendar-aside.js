import React, { useContext } from 'react';
import { State } from '../store/store';
import { setCalendar, toggleCalendar, setCalendarEvents } from '../actions/actions';
import calendarConfig from '../../dist/config/config.json';

const CalendarAside = () => {
    const [state, dispatch] = useContext(State);
    const { month, year, calendars } = state;

    // DEFINE TIME CONSTANTS
    const startTimeDate = (new Date(year, month, 1)).setHours(0, 0, 0, 0);
    const startTime = (new Date(startTimeDate)).toISOString();
    const endTimeDate = (new Date(year, month + 1, 0)).setHours(11, 59, 59);
    const endTime = (new Date(endTimeDate)).toISOString();

    // CHANGE CALENDAR METHOD
    const changeCalendar = (id) => {
        
        // THE TOGGLED CALENDAR EXISTS IN THE STORE
        if(id in calendars) {

            // THE TOGGLED CALENDAR IS ACTIVE
            if(calendars[id].active) {

                // JUST TOGGLE THE ACTIVE STATE TO SHOW/HIDE
                dispatch(toggleCalendar(id));
            }
            
            // THE TOGGLED CALENDAR IS NOT ACTIVE
            else {

                // THERE ARE SAVED EVENTS FOR THIS MONTH/YEAR IN THE STORE
                if(month + "/" + year in calendars[id].events) {
                    
                    // JUST TOGGLE THE ACTIVE STATE TO SHOW/HIDE
                    dispatch(toggleCalendar(id));
                }
                
                // THERE ARE NO SAVED EVENTS FOR THIS MONTH/YEAR
                else {

                    // WE NEED TO REQUEST EVENTS FOR THIS MONTH/YEAR
                    fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?orderBy=startTime&singleEvents=true&timeMin=${startTime}&timeMax=${endTime}&key=AIzaSyAEqKrKq0z4Hh9jmYxjkG0nE9089M9Q95k`)
                    .then(response => response.json()) // RETURN JSON
                    .then((calendarData) => { // NOW DO WORK WITH THE DATA

                        // ADD THIS CALENDAR DATA TO THE STORE
                        dispatch(setCalendarEvents({
                            id: id,
                            events: { [month + "/" + year]: calendarData.items }
                        }));

                        // TOGGLE THE ACTIVE STATE TO SHOW/HIDE
                        dispatch(toggleCalendar(id));
                    })
                    .catch(error => { // SIMPLE ERROR CATCH
                        console.log(error);
                    });
                }
            }
        }
        
        // THE TOGGLED CALENDAR DOES NOT EXIST IN THE STORE YET SO WE NEED TO GET IT
        else {
            // FETCH OUR CALENDAR DATA AND EVENTS FOR THIS MONTH/YEAR
            fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?orderBy=startTime&singleEvents=true&timeMin=${startTime}&timeMax=${endTime}&key=AIzaSyAEqKrKq0z4Hh9jmYxjkG0nE9089M9Q95k`)
                .then(response => response.json()) // RETURN JSON
                .then((calendarData) => { // NOW DO WORK WITH THE DATA

                    // SET THE COLOR FOR THIS CALENDAR
                    const calendarColor = calendarConfig.calendars.filter(calendar => {
                        if(calendar.id == id) {
                            return calendar.color;
                        }
                    })[0].color;
                    
                    // ADD THIS CALENDAR DATA TO THE STORE
                    dispatch(setCalendar({
                        [id]: {
                            id: id,
                            active: true,
                            name: calendarData.summary,
                            color: calendarColor,
                            events: {
                                [month + "/" + year]: calendarData.items
                            }
                        }
                    }));
                })
                .catch(error => { // SIMPLE ERROR CATCH
                    console.log(error);
                });
        }
    }

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
                                <input type="checkbox" className="google-calendar__calendar-toggle" id={"google-calendar__calendar-item-" + index} checked={checkedState} onChange={() => { changeCalendar(calendar.id)}}  />
                                <span className="google-calendar__calendar-color-swatch" style={{backgroundColor: calendar.color}}></span>
                                <span className="google-calendar__calendar-name">{calendar.name}</span>
                            </li>
                })}
            </ul>
        </div>
    );
};

export default CalendarAside;