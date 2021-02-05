import React from 'react';
import CalendarRow from './calendar-row';

const Calendar = () => (
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

        </div>
    </div>
);

export default Calendar;