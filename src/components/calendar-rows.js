import React, { useContext } from 'react';
import { State } from '../store/store';
import moment from 'moment';
import CalendarRow from '../components/calendar-row';
import CalendarDay from '../components/calendar-day';

const CalendarRows = () => {
    const [state, dispatch] = useContext(State);
    const { month, year, calendars } = state;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const monthLength = (new Date(year, month + 1, 0)).getDate();

    let calendarRows = [];
    let calendarDays = [];
    let day = 1;
    let keyCounter = 0;

    // LOOP FOR MAX NUMBER OF WEEK ROWS
    // LOOP WILL BREAK WHEN DAYS ARE DONE
    for (var w = 0; w < 9; w++) {

        // LOOP FOR EACH DAY CELL IN THIS ROW
        for (var d = 0; d <= 6; d++) {

            // IF DAY CELL HAS A DATE
            if (day <= monthLength && (w > 0 || d >= startDay)) {
                let dayEvents = [];

                // LOOP THROUGH EACH CALENDAR
                for(const cal in calendars) {
                    let calendar = calendars[cal];

                    // ONLY ITERATE IF EVENTS EXIST
                    if(calendar.active) {
                        if(month + "/" + year in calendar.events) {
                            if(calendar.events[month + "/" + year].length) {
                                calendar.events[month + "/" + year].forEach(event => {
                                    let startDate = ('date' in event.start) ? event.start.date : (event.start.dateTime.split("T"))[0];
                                    if(moment(startDate).isSame(new Date(year, month, day))) {
                                        
                                        // PUSH EVENT TO EVENT BANK
                                        dayEvents.push({
                                            ...event,
                                            calendarColor: calendar.color
                                        });
                                    }
                                });
                            }
                        }
                    }
                };

                // CREATE AND PUSH CALENDAR DAY TO BANK
                calendarDays.push(<CalendarDay blankDayCell="false" date={day} month={months[month]} day={days[d]} key={d} events={dayEvents} />);

                // INCREMENT OUR DAY COUNTER
                day++;
            }
            
            // IF THIS DAY CELL DOESN'T HAVE A DATE
            else {
                // CREATE AND PUSH EMPTY CALENDAR DAY TO BANK
                calendarDays.push(<CalendarDay blankDayCell="true" date={null} month={months[month]} day={days[d]} key={d} />);
            }

            keyCounter++;
        }

        // CREATE AND PUSH THIS CALENDAR ROW
        calendarRows.push(<CalendarRow key={w} days={calendarDays} />);
        
        // RESET DAYS ARRAY
        calendarDays = [];
        
        // BREAK THE LOOP IF DAYS ARE ALL BUILT
        if (day > monthLength) break;
    }

    return (
        <div className="google-calendar__rows">
            {calendarRows}
        </div>
    );
}; 

export default CalendarRows;