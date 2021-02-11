import React, { useContext } from 'react';
import { State } from '../store/store';

const CalendarToolbar = () => {
    const [state, dispatch] = useContext(State);
    const { month } = state;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="google-calendar__toolbar">
            <h2>{months[month]}</h2>
            <div className="google-calendar__navigation-controls">
                <a href="#" role="butotn" className="google-calendar__navigation-control google-calendar--today">Today</a>
                <a href="#" role="button" className="google-calendar__navigation-control google-calendar--back">back</a>
                <a href="#" role="button" className="google-calendar__navigation-control google-calendar--next">next</a>
            </div>
        </div>
    );
};

export default CalendarToolbar;