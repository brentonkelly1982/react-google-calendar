import React from 'react';

const CalendarHeaders = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <div className="google-calendar__headers">
            {days.map((day, index) => 
                <div className={'google-calendar__header google-calendar--' + day} key={index}>{day}</div>
            )}
        </div>
    );
}

export default CalendarHeaders; 