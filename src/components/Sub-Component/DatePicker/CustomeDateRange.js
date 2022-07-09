import React, { useState, useEffect, } from 'react';
import { DateRange, Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Moment from 'moment';

export default function BasicDateRangePicker() {
    const [toggle, setToggle] = useState(true);
    const [date, setDate] = useState(new Date);
    return (
        <>
            {/* <div className="input-wrapper marginLeft-0" style={{ marginBottom: 0, position: '', minWidth: '150px', maxWidth: '150px' }}>
                <div className="input-holder">
                    <input type="text" className="input-input" name="DateOfBirth" onClick={
                        () => {
                            document.querySelector('.rdrCalendarWrapper').classList.toggle('toggle');
                        }
                    } value={Moment(date).format('DD/MM/YYYY')} />
                    <label className="input-label">Date</label>
                </div>
            </div> */}
            <Calendar
                date={date}
                onChange={(date) => { setDate(date) }}
                color={localStorage['BgColor']}
            />
        </>
    )

}
