import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';

export default function DatePicker_(props) {
    const [Date_, setDate] = useState(new Date(props['Value']));
    const valueChange = props['valueChange'];
    const minDate = props['minDate_'] || null;
    const isWeekEndDisable = props['isWeekEndDisable'];
    const handelDateChange = (value, e) => {
        var text = Moment(value).format('MM-DD-YYYY').toString();
        setDate(value);
        valueChange({ target: { name: props['name'], attributes: { index: { value: props['index'] || 0 } }, value: text } })
    }
    const getWeekEnd = (date) => {
        const day = date.getDay();
        if (!(day !== 0 && day !== 6) && minDate < date)
            return "disabled";
    }

    const isDisableWeekEnd = () => {
        return isWeekEndDisable || isWeekEndDisable === undefined ? { dayClassName: getWeekEnd } : null;
    }
    return (
        // showYearDropdown,showMonthDropdown
        <DatePicker name={props['name']}
            {...isDisableWeekEnd()}
            closeOnScroll={(e) => e.target === document}
            minDate={minDate}
            selected={Date_}
            onChange={handelDateChange} />
    );
}
