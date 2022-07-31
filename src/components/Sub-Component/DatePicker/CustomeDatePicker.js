import React from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function CustomeDatePicker(props) {
    const Date = props['Date'];
    return (
        <>
            <Calendar
                date={Date}
                onChange={props['OnChange']}
                color={localStorage['BgColor']}
            />
        </>
    )

}
