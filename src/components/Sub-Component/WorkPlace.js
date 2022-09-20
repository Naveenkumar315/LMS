import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setTheme from '../Sub-Component/setTheme';

export default function WorkPlace() {
    useEffect(() => {
        setTheme();
    }, []);
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    );
}
