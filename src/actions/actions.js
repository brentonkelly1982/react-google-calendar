import React from 'react';
import CalendarRow from '../components/calendar-row';
import CalendarDay from '../components/calendar-day';

export const buildCalendarRows = ({ month, year }) => {
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
    // LOOP FOR MAX NUMBER OF WEEK ROWS
    // LOOP WILL BREAK WHEN DAYS ARE DONE
    for (var w = 0; w < 9; w++) {
        // LOOP FOR EACH DAY CELL
        for (var d = 0; d <= 6; d++) {
            // IF DAY CELL HAS A DATE
            if (day <= monthLength && (w > 0 || d >= startDay)) {
                calendarDays.push(<CalendarDay blankDayCell="false" date={day} />);

                // INCREMENT OUR DAY COUNTER
                day++;
            }
            
            // IF THIS DAY CELL DOESN'T HAVE A DATE
            else {
                calendarDays.push(<CalendarDay blankDayCell="true" date={null} />);
            }
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

export const buildCalendarDays = (calendarDays) => {
    let days = calendarDays.map(day => {
        return day;
    });

    return days;
}