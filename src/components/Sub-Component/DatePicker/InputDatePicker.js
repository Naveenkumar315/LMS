import React, { useState, useEffect, } from 'react';
import { DateRange, Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Moment from 'moment';
import { setDate } from 'date-fns';

export default function InputDatePicker(props) {
    debugger
    const [date, setDate] = useState({
        text: props['Value'] ? props['Value'] : ''
        , date: props['Value'] ? new Date(props['Value'].split('-').reverse().join('-')) : new Date()
    });
    console.log({
        text: props['Value'] ? props['Value'] : Moment(props['Value']).format('DD-MM-YYYY')
        , date: props['Value'] ? new Date(props['Value'].split('-').reverse().join('-')) : new Date()
    });
    const valueChange = props['valueChange']
    const [IsOpen, setIsOpen] = useState(false);
    const handelDateChange = (value, e) => {
        var text = Moment(value).format('DD-MM-YYYY').toString();
        setDate({ text: text, date: value });
        valueChange({ target: { name: props['name'], value: text } })
    }
    return (
        <>
            <div className="input-wrapper marginLeft-0">
                <div className="input-holder" >
                    <input type="text" className="input-input" name={props['name']} value={date['text']} onClick={() => { setIsOpen(!IsOpen) }} />
                    <label className="input-label">{props['label']}</label>
                </div>
                {IsOpen && <Calendar className='input-Date'
                    date={date['date']}
                    name={props['name']}
                    color={localStorage['BgColor']}
                    onChange={handelDateChange}
                />}
            </div>
        </>
    )

}
