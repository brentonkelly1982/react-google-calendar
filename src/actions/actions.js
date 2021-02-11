import React, { useContext } from 'react';
import { State } from '../store/store';
import moment from 'moment';
import CalendarRow from '../components/calendar-row';
import CalendarDay from '../components/calendar-day';

export const buildCalendarRows = () => {
    const [state, dispatch] = useContext(State);
    const { month, year, calendars } = state;
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const monthLength = daysInMonth[month];

    // ADJUST FEBRUARY IF NEEDED
    if (month == 1) {
        if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
            monthLength = 29;
        }
    }

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
                calendars.forEach(calendar => {

                    // ONLY ITERATE IF EVENTS EXIST
                    if(calendar.events.length) {
                        calendar.events.forEach(event => {
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
                });

                // CREATE AND PUSH CALENDAR DAY TO BANK
                calendarDays.push(<CalendarDay blankDayCell="false" date={day} key={d} events={dayEvents} />);

                // INCREMENT OUR DAY COUNTER
                day++;
            }
            
            // IF THIS DAY CELL DOESN'T HAVE A DATE
            else {
                // CREATE AND PUSH EMPTY CALENDAR DAY TO BANK
                calendarDays.push(<CalendarDay blankDayCell="true" date={null} key={d} />);
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

    return calendarRows;
}