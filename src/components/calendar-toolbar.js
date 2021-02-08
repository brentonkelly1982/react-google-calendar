import React from 'react';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CalendarToolbar = ({ month }) => (
    <div className="google-calendar__toolbar">
        <h2>{months[month]}</h2>
        <div className="google-calendar__navigation-controls">
            <a href="#" role="butotn" className="google-calendar__navigation-control google-calendar--today">Today</a>
            <a href="#" role="button" className="google-calendar__navigation-control google-calendar--back">back</a>
            <a href="#" role="button" className="google-calendar__navigation-control google-calendar--next">next</a>
        </div>
    </div>
);

export default CalendarToolbar;