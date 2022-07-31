import React, { useState, } from 'react';
import axios from 'axios';
import nodeurl from '../../../nodeServer.json'
import Moment from 'moment';
import InputDatePicker from '../../Sub-Component/DatePicker/InputDatePicker';

export default function PermissionWH() {
    const EmpId = localStorage['EmpId'];
    const [IsOpen, setIsOpen] = useState(false);
    const [DetailsWH, setDetailsWH] = useState({ EmpId: EmpId, StartDate: Moment(new Date()).format('MM-DD-YYYY'), EndDate: Moment(new Date()).format('MM-DD-YYYY'), From: '09.00', To: '09.30', Duration: 0, TotalHours: '00.30', Reason: '', PermissionID: 1 })
    const TimeArr = [
        { value: "09.00", text: "09.00" }, { value: "09.30", text: "09.30" }, { value: "10.00", text: "10.00" }, { value: "10.30", text: "10.30" },
        { value: "11.00", text: "11.00" }, { value: "11.30", text: "11.30" }, { value: "12.00", text: "12.00" }, { value: "12.30", text: "12.30" },
        { value: "13.00", text: "13.00" }, { value: "13.30", text: "13.30" }, { value: "14.00", text: "14.00" }, { value: "14.30", text: "14.30" },
        { value: "15.00", text: "15.00" }, { value: "15.30", text: "15.30" }, { value: "16.00", text: "16.00" }, { value: "16.30", text: "16.30" },
        { value: "17.00", text: "17.00" }, { value: "17.30", text: "17.30" }, { value: "18.00", text: "18.00" }, { value: "18.30", text: "18.30" },
        { value: "19.00", text: "19.00" }, { value: "19.30", text: "19.30" }
    ];
    let ToOption = TimeArr;
    ToOption = TimeArr.slice(TimeArr.findIndex(x => x.value === DetailsWH['From']) + 1, TimeArr.findIndex(x => x.value === DetailsWH['From']) + 5);

    const handelClick = () => {
        setIsOpen(false);
        axios.post(nodeurl['nodeurl'] + 'Update', { SP: 'LM_PM_PermissionApply ', UpdateJson: JSON.stringify(DetailsWH) }).then(result => {
            console.log(result.data[0]);
        });
    }
    const handelOnChange = (event) => {
        if (event.target.name === 'StartDate') DetailsWH['EndDate'] = event.target.value;
        if (event.target.name === 'From') DetailsWH['TotalHours'] = '00.30';
        if (event.target.name === 'To') DetailsWH['TotalHours'] = (((parseFloat(event.target.value)) - parseFloat(DetailsWH['From'])).toFixed(2)).replace('.7', '.3');
        setDetailsWH({ ...DetailsWH, [event.target.name]: event.target.value });
    }


    return (
        <div style={{ margin: '30px 0', width: '99%', height: '50vh' }}>

            <div className="input-wrapper marginLeft-0">
                <div className="input-holder">
                    <input type="text" className="input-input" name="StartDate" onFocus={() => { setIsOpen(true) }} value={Moment(DetailsWH['StartDate']).format('DD-MM-YYYY')} onChange={handelOnChange} />
                    <label className="input-label">Date</label>
                </div>
                {IsOpen && DetailsWH['StartDate'] ? <InputDatePicker name="StartDate" Value={DetailsWH['StartDate']} valueChange={handelOnChange} /> : ''}
            </div>

            <div className="input-wrapper marginLeft-0">
                <div className="input-holder">
                    <select className="input-input" name="From" value={DetailsWH['From']} onFocus={() => { setIsOpen(false) }} onChange={handelOnChange}>
                        {TimeArr.map((item, index) => (
                            <option key={index} value={item['value']}>{item['text']}</option>
                        ))}
                    </select>
                    <label className="input-label">From</label>
                </div>
            </div>
            <div className="input-wrapper marginLeft-0">
                <div className="input-holder">
                    <select className="input-input" name="To" value={DetailsWH['To']} onFocus={() => { setIsOpen(false) }} onChange={handelOnChange}>
                        {ToOption.map((item, index) => (
                            <option key={index} value={item['value']}>{item['text']}</option>
                        ))}
                    </select>
                    <label className="input-label">To</label>
                </div>
            </div>
            <div className="input-wrapper marginLeft-0">
                <div className="input-holder">
                    <input type="text" className="input-input" name="TotalHours" disabled value={DetailsWH['TotalHours']} onChange={handelOnChange} />
                    <label className="input-label">Total Hours</label>
                </div>
            </div>

            <div className="input-wrapper marginLeft-0">
                <div className="input-holder">
                    <input type="text" className="input-input" name="Reason" onFocus={() => { setIsOpen(false) }} value={DetailsWH['Reason']} onChange={handelOnChange} />
                    <label className="input-label">Reason</label>
                </div>
            </div>

            <div>
                <button className="btn marginLeft-0" onClick={handelClick}>Apply</button>
            </div>
        </div>
    );
}
