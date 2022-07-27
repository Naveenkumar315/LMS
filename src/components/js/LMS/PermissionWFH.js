import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import nodeurl from '../../../nodeServer.json'
import setTheme from '../../Sub-Component/setTheme';
import Moment from 'moment';

export default function PermissionWFH() {
    const [EmpId, setEmpId] = useState(localStorage['EmpId']);
    const [DetailsWFH, setDetailsWFH] = useState({ EmpId: EmpId, StartDate: Moment(new Date).format('YYYY-MM-DD'), EndDate: Moment(new Date).format('YYYY-MM-DD'), From: '0.00', To: '0.00', Duration: 0, TotalHours: '1.00', Reason: '', PermissionID: 2 })

    const handelClick = () => {

        axios.post(nodeurl['nodeurl'] + 'Update', { SP: 'LM_PM_PermissionApply ', UpdateJson: JSON.stringify(DetailsWFH) }).then(result => {
            console.log(result.data[0]);
        });
    }
    const handelOnChange = (event) => {
        if (event.target.name === 'StartDate') DetailsWFH['EndDate'] = event.target.value;
        if (event.target.name === 'Duration' && event.target.value === '0') {
            DetailsWFH['TotalHours'] = '1.00'
        } else if (event.target.name === 'Duration' && event.target.value === '1') {
            DetailsWFH['TotalHours'] = '0.5'
        }
        setDetailsWFH({ ...DetailsWFH, [event.target.name]: event.target.value });
    }


    return (
        <div style={{ margin: '30px 0', width: '99%' }}>
            <div className="input-wrapper marginLeft-0">
                <div className="input-holder">
                    <input type="text" className="input-input" name="StartDate" value={DetailsWFH['StartDate']} onChange={handelOnChange} />
                    <label className="input-label">Date</label>
                </div>
            </div>

            <div className="input-wrapper marginLeft-0">
                <div className="input-holder">
                    <select className="input-input" name="Duration" value={DetailsWFH['Duration']} onChange={handelOnChange}>
                        <option value='0'>Full Day</option>
                        <option value='1'>1st Half</option>
                        <option value='2'>2nd half</option>
                    </select>
                    <label className="input-label">Duration</label>
                </div>
            </div>
            <div className="input-wrapper marginLeft-0">
                <div className="input-holder">
                    <input type="text" className="input-input" name="TotalHours" disabled value={DetailsWFH['TotalHours']} onChange={handelOnChange} />
                    <label className="input-label">No. Of Days</label>
                </div>
            </div>

            <div className="input-wrapper marginLeft-0">
                <div className="input-holder">
                    <input type="text" className="input-input" name="Reason" value={DetailsWFH['Reason']} onChange={handelOnChange} />
                    <label className="input-label">Reason</label>
                </div>
            </div>

            <div>
                <button className="btn marginLeft-0" onClick={handelClick}>Apply</button>
            </div>
        </div>
    );



}
