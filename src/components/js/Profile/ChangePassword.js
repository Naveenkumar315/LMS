import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import nodeurl from '../../../nodeServer.json'
import { useNavigate } from "react-router-dom";
export default function ChangePassword() {
    const EmpId = localStorage['EmpId'];

    const DetailsFields = () => {
        const navigate = useNavigate();
        const [Details, setDetails] = useState({})
        const [isOTPSent, setIsOTPSent] = useState(false);
        const [isOTPVerified, setIsOTPVerified] = useState(false);
        const [OTP, setOTP] = useState();
        const [password, setPassword] = useState({ NewPassword: '', ConfirmNewPassword: '' });
        const Navigate = (path) => {
            navigate(path);
        }
        useEffect(() => {
            axios.post(nodeurl['nodeurl'], { query: 'AB_ViewEmpProfile ' + EmpId }).then(result => {
                setDetails(result.data[0][0]);
            });
        }, []);
        const handelOnChange = (event) => {
            setDetails({ ...Details, [event.target.name]: event.target.value });
        }
        const handelSubmitClick = () => {
            if (password['NewPassword'] === password['ConfirmNewPassword']) {
                axios.post(nodeurl['nodeurl'],
                    { query: "Update EmployeeDetails set Password='" + password['NewPassword'] + "' where EmpId=" + EmpId }).then(result => {
                        console.log('updated.... ');
                        Navigate('/')
                    });
            }

        }
        const handelPWDChange = (e) => {
            setPassword({ ...password, [e.target.name]: e.target.value })
        }
        const handelClick = (e) => {
            if (!isOTPSent) {
                e.target.textContent = 'Verify'
                setIsOTPSent(true);
                axios.post(nodeurl['nodeurl'] + 'Email', { EmpId: EmpId, EmailTo: Details['UserName'] }).then(result => {
                });
            }
            else if (!isOTPVerified) {
                axios.post(nodeurl['nodeurl'],
                    { query: 'select case when otp=' + OTP + ' then 1 else 0 end AS Date from EmployeeDetails where EmpId=' + EmpId }).then(result => {
                        if (result.data[0][0]['Date'] === 1)
                            setIsOTPVerified(true);
                    });
            }
        }
        return (
            <>
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    {!isOTPVerified && <div style={{ margin: '30px 30px 0 0', width: '30%', display: 'inline-block' }}>
                        <div className="input-wrapper marginLeft-0">
                            <div className="input-holder">
                                <input type="text" className="input-input" name="UserName" disabled value={Details['UserName']} onChange={handelOnChange} />
                                <label className="input-label">User Name</label>
                            </div>
                        </div>
                        <div className="input-wrapper marginLeft-0">
                            <div className="input-holder">
                                <input type="text" className="input-input" name="OneTimePassword" value={OTP} onChange={(e) => { setOTP(e.target.value) }} />
                                <label className="input-label">One Time Password</label>
                            </div>
                        </div>
                    </div>
                    }
                    {isOTPVerified && <div style={{ margin: '30px 30px 0 0', width: '30%', display: 'inline-block' }}>
                        <div className="input-wrapper marginLeft-0">
                            <div className="input-holder">
                                <input type="text" className="input-input" name="NewPassword" value={password['NewPassword']} onChange={handelPWDChange} />
                                <label className="input-label">New Password</label>
                            </div>
                        </div>
                        <div className="input-wrapper marginLeft-0">
                            <div className="input-holder">
                                <input type="text" className="input-input" name="ConfirmNewPassword" value={password['ConfirmNewPassword']} onChange={handelPWDChange} />
                                <label className="input-label">Confirm New Password</label>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div>
                    {!isOTPVerified && <button className='btn marginLeft-0' onClick={handelClick}>Send OTP</button>}
                    {isOTPVerified && <div>
                        <button className='btn marginLeft-0 d-none' onClick={handelSubmitClick}>Resend OTP</button>
                        <button className='btn marginLeft-0' onClick={handelSubmitClick}>Save</button>
                    </div>}
                </div>
            </>
        );
    }
    return (
        <DetailsFields />
    )
}
