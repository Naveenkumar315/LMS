import React, { useState, useEffect, } from 'react';
import { DateRange, Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Moment from 'moment';

export default function CustomeDatePicker() {
    const [toggle, setToggle] = useState(true);
    const [date, setDate] = useState(new Date);
    return (
        <>
            <Calendar
                date={date}
                onChange={(date) => { setDate(date) }}
                color={localStorage['BgColor']}
            />
        </>
    )

}
