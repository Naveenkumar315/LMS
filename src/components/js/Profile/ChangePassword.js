import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import nodeurl from '../../../nodeServer.json'
import NavBar from '../../Sub-Component/NavBar';

export default function ChangePassword() {
    const [EmpId, setEmpId] = useState(localStorage['EmpId']);
    const [Details, setDetails] = useState({})
    useEffect(() => {
        axios.post(nodeurl['nodeurl'], { query: 'AB_ViewEmpProfile ' + EmpId }).then(result => {
            setDetails(result.data[0][0]);
        });
    }, []);
    const handelOnChange = (event) => {
        setDetails({ ...Details, [event.target.name]: event.target.value });
    }
    const DetailsFields = () => {
        return (
            <>
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <div style={{ margin: '30px 30px 0 0', width: '30%', display: 'inline-block' }}>
                        <div className="input-wrapper marginLeft-0">
                            <div className="input-holder">
                                <input type="text" className="input-input" name="UserName" value={Details['UserName']} onChange={handelOnChange} />
                                <label className="input-label">User Name</label>
                            </div>
                        </div>
                        <div className="input-wrapper marginLeft-0">
                            <div className="input-holder">
                                <input type="text" className="input-input" name="OneTimePassword" onChange={handelOnChange} />
                                <label className="input-label">One Time Password</label>
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: '30px 30px 0 0', width: '30%', display: 'inline-block' }}>
                        <div className="input-wrapper marginLeft-0">
                            <div className="input-holder">
                                <input type="text" className="input-input" name="NewPassword" onChange={handelOnChange} />
                                <label className="input-label">New Password</label>
                            </div>
                        </div>
                        <div className="input-wrapper marginLeft-0">
                            <div className="input-holder">
                                <input type="text" className="input-input" name="ConfirmNewPassword" onChange={handelOnChange} />
                                <label className="input-label">Confirm New Password</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="btn marginLeft-0">Update</button>
                </div>
            </>
        );
    }
    return (
        <DetailsFields />
    )
}
