import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import nodeurl from '../../../nodeServer.json'
import NavBar from '../../Sub-Component/NavBar';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ChangePassword from './ChangePassword';
import setTheme from '../../Sub-Component/setTheme';
import InputDatePicker from '../../Sub-Component/DatePicker/InputDatePicker';

export default function Profile() {
    const EmpId = localStorage['EmpId'];

    const DetailsFields = () => {
        const [Details, setDetails] = useState({})
        useEffect(() => {
            setTheme();
            axios.post(nodeurl['nodeurl'], { query: 'AB_ViewEmpProfile ' + EmpId }).then(result => {
                setDetails(result.data[0][0]);
            });
        }, []);
        const handelOnChange = (event) => {
            setDetails({ ...Details, [event.target.name]: event.target.value });
            setTimeout(() => {
                console.log(Details);
            }, 2000);
        }
        const handelClick = () => {
            axios.post(nodeurl['nodeurl'] + 'Update', { SP: 'AB_UpdateEmployeeDetail ', UpdateJson: JSON.stringify(Details) }).then(result => {
            });
        }
        return (
            <div style={{ margin: '30px 0', width: '99%' }}>
                <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <input type="text" className="input-input" name="FirstName" value={Details['FirstName']} onChange={handelOnChange} />
                        <label className="input-label">First Name</label>
                    </div>
                </div>

                <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <input type="text" className="input-input" name="LastName" value={Details['LastName']} onChange={handelOnChange} />
                        <label className="input-label">Last Name</label>
                    </div>
                </div>

                <InputDatePicker name="DateOfBirth" label="Date Of Birth" Value={Details['DateOfBirth']} valueChange={handelOnChange} />

                {/* <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <input type="text" className="input-input" name="DateOfBirth" value={Details['DateOfBirth']} onChange={handelOnChange} />
                        <label className="input-label">Date Of Birth</label>
                    </div>
                </div> */}
                <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <input type="text" className="input-input" name="PhoneNumber" value={Details['PhoneNumber']} onChange={handelOnChange} />
                        <label className="input-label">Mobile No.</label>
                    </div>
                </div>
                <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <select className="input-input" name="Gender" value={Details['Gender']} onChange={handelOnChange}>
                            <option value="2">Male</option>
                            <option value="1">Female</option>
                        </select>
                        <label className="input-label">Gender</label>
                    </div>
                </div>
                <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <input type="text" className="input-input" name="EmailID" value={Details['EmailID']} onChange={handelOnChange} />
                        <label className="input-label">Personal Email Id</label>
                    </div>
                </div>
                <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <textarea className="input-input" name="Address" value={Details['Address']} onChange={handelOnChange} />
                        <label className="input-label">Address</label>
                    </div>
                </div>
                <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <input type="text" className="input-input" disabled name="DateOfJoin" value={Details['DateOfJoin']} onChange={handelOnChange} />
                        <label className="input-label">Date Of Joining</label>
                    </div>
                </div>
                <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <input type="text" className="input-input" disabled name="UserName" value={Details['UserName']} onChange={handelOnChange} />
                        <label className="input-label">Official Mail ID(User Name)</label>
                    </div>
                </div>
                <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <select className="input-input" name="Question" value={Details['Question']} onChange={handelOnChange}>
                            <option value="1">What is your favourite color?</option>
                            <option value="2">What is your favourite place?</option>
                            <option value="3">What is your favourite teachers name?</option>
                            <option value="4">Who is your favourite film actor?</option>
                            <option value="5">What was your childhood nickname?</option>
                            <option value="6">What is the name of the company of your first job?</option>
                        </select>
                        <label className="input-label">Select security question?</label>
                    </div>
                </div>
                <div className="input-wrapper marginLeft-0">
                    <div className="input-holder">
                        <input type="text" className="input-input" name="Hintans" value={Details['Hintans']} onChange={handelOnChange} />
                        <label className="input-label">Answer</label>
                    </div>
                </div>
                <div>
                    <button className="btn marginLeft-0" onClick={handelClick}>Save Details</button>
                </div>
            </div>
        );
    }

    function TabPanel(props) {

        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography component={"span"} variant={"body2"}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    function FullWidthTabs(props) {
        const [value, setValue] = useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const handleChangeIndex = (index) => {
            setValue(index);
        };

        return (
            <Box sx={{ bgcolor: 'inherit' }}>
                <AppBar position="static" style={{ width: '255px', marginLeft: '25px', backgroundColor: '#fff' }} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        style={{ color: localStorage['BgColor'] }}
                    >
                        <Tab label="Profile" className='tab' {...a11yProps(0)} />
                        <Tab label="Change Password" className='tab'  {...a11yProps(1)} />
                        <Tab label="Change Password" className='tab'  {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    //axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
                        <DetailsFields />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ChangePassword />
                    </TabPanel>
                    {/* <TabPanel value={value} index={1}>
                        <ChangePassword />
                    </TabPanel> */}

                </SwipeableViews >
            </Box >
        );
    }
    return (
        <NavBar Component={<FullWidthTabs />} />
    )
}
