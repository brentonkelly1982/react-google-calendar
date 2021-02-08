import React, { useState } from 'react';
import { buildCalendarRows } from '../actions/actions';
import calendarConfig from '../../dist/config/config.json';

const Calendar = () => {
    const thisMonth = (new Date()).getMonth();
    const thisYear = (new Date()).getFullYear();
    const [month, setMonth] = useState(thisMonth);
    const [year, setYear] = useState(thisYear);

    return (
        <div id="google-calendar">
            <div className="google-calendar__headers">
                <div className="google-calendar__header google-calendar--sunday">Sunday</div>
                <div className="google-calendar__header google-calendar--monday">Monday</div>
                <div className="google-calendar__header google-calendar--tuesday">Tuesday</div>
                <div className="google-calendar__header google-calendar--wednesday">Wednesday</div>
                <div className="google-calendar__header google-calendar--thursday">Thursday</div>
                <div className="google-calendar__header google-calendar--friday">Friday</div>
                <div className="google-calendar__header google-calendar--saturday">Saturday</div>
            </div>
            <div className="google-calendar__rows">
                {buildCalendarRows({ month: month, year: year })}
            </div>
        </div>
    )
};

export default Calendar;