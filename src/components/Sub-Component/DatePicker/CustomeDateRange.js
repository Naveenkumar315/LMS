import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


export default function BasicDateRangePicker(props) {
    return (
        <>
            <DateRange
                editableDateInputs={true}
                onChange={props['OnChange']}
                moveRangeOnFirstSelection={false}
                ranges={props['DateRange']}
            />
        </>
    )

}
