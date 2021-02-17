import React from 'react';
import Calendar from './calendar';
import '../css/index.css';
import Store from '../store/store';

const App = () => (
    <Store>
        <Calendar />
    </Store>
);

export default App;