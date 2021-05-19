import React, { useContext } from 'react';
import { loadNextMonth, loadPreviousMonth, loadThisMonth } from '../thunks/thunks';

import { State } from '../store/store';

const CalendarToolbar = () => {
    const [ state, dispatch ] = useContext(State);
    const { month, year } = state;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="google-calendar__toolbar">
            <h2 className="google-calendar__calendar-month-header">{months[month] + " " + year}</h2>
            <div className="google-calendar__navigation-controls">
                <button aria-label="Load current month" className="google-calendar__navigation-control google-calendar--today" onClick={(e) => { dispatch(loadThisMonth(e)) }}>This Month</button>
                <button aria-label="Load previous month" className="google-calendar__navigation-control google-calendar--back google-calendar--icon google-calendar--arrow" onClick={(e) => { dispatch(loadPreviousMonth(e)) }}></button>
                <button aria-label="Load next month" className="google-calendar__navigation-control google-calendar--next google-calendar--icon google-calendar--arrow" onClick={(e) => { dispatch(loadNextMonth(e)) }}></button>
            </div>
        </div>
    );
};

export default CalendarToolbar;