import React from 'react';
import Calendar from './calendar';
import '../css/calendar.css';
import Store from '../store/store';

const App = () => (
    <Store>
        <Calendar />
    </Store>
);

export default App;