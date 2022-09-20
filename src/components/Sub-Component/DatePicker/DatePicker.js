import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';

export default function DatePicker_(props) {
    const [Date_, setDate] = useState(new Date(props['Value']));
    const valueChange = props['valueChange'];
    const minDate = props['minDate_'] || null;
    const handelDateChange = (value, e) => {
        var text = Moment(value).format('MM-DD-YYYY').toString();
        setDate(value);
        valueChange({ target: { name: props['name'], attributes: { index: { value: props['index'] || 0 } }, value: text } })
    }
    return (
        <DatePicker name={props['name']} minDate={minDate} selected={Date_} onChange={handelDateChange} />
    );
}
