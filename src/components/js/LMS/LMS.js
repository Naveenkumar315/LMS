import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nodeurl from '../../../nodeServer.json'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomGrid from '../../Sub-Component/CustomeGrid';
import setTheme from '../../Sub-Component/setTheme';
import Permission from './Permission';
import LeaveBalanceTab from './LeaveBalance';
import Snackbars from '../../Sub-Component/alert';


export default function Lms() {
    const [alertDetails, setAlertDetails] = useState({ IsShow: false, severity: 'success', message: 'Weldsdacome' });
    useEffect(() => {
        setTheme();
    }, []);

    const handelAction = (e) => {
        var id = e.target.id;
        var type = e.target.attributes.clicktype.value;
        var query = '';
        if (type === '1') query = 'SP_LM_CheckCancelStatus';
        else if (type === '2') query = 'SP_LM_LOP_Cancel_Request';
        else if (type === '4') query = 'LM_PM_ReturnCancelStatus';
        axios.post(nodeurl['nodeurl'], { query: query + ' ' + id }).then(result => {
            setAlertDetails({ IsShow: true, severity: 'success', message: query });
        });
    }

    const LeaveHistoryColumn = [
        { id: 'LeaveType', label: 'Leave Type', minWidth: 130 },
        { id: 'AppliedOn', label: 'Applied On', minWidth: 100 },
        { id: 'StartDate', label: 'Start Date', minWidth: 100 },
        { id: 'EndDate', label: 'End Date', minWidth: 100 },
        { id: 'No_Of_Days', label: 'No. of Days', minWidth: 110 },
        { id: 'status', label: 'Status', minWidth: 130 },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: 'Leaveoptions', label: 'Leave Option', minWidth: 200 },
        { id: '', label: 'Action', minWidth: 100, button: 'Cancel', type: 1 },
        { id: '', label: 'LOP', minWidth: 100, button: 'Cancel', type: 2 }
    ];
    const PermissionHistoryColumn = [
        { id: 'PermissionType', label: 'Permission Type', minWidth: 200 },
        { id: 'AppliedOn', label: 'Applied On', minWidth: 160 },
        { id: 'StartDate', label: 'Start Date Time', minWidth: 160 },
        { id: 'EndDate', label: 'End Date Time', minWidth: 160 },
        { id: 'No_of_days', label: 'Hours', minWidth: 110 },
        { id: 'Status', label: 'Status', minWidth: 130 },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: '', label: 'Action', minWidth: 100, button: 'Cancel', type: 4, onclick: handelAction },
    ];
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
        const [value, setValue] = useState(1);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const handleChangeIndex = (index) => {
            setValue(index);
        };

        return (
            <>
                {alertDetails['IsShow'] ? <Snackbars Details={alertDetails} /> : <></>}
                <Box sx={{ bgcolor: 'inherit' }}>
                    <AppBar position="static" style={{ width: '605px', marginLeft: '25px', backgroundColor: '#fff' }} >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="inherit"
                            style={{ color: localStorage['BgColor'] }}>
                            <Tab label="Leave History" className='tab' {...a11yProps(0)} />
                            <Tab label="Leave Balance" className='tab'  {...a11yProps(1)} />
                            <Tab label="Permission History" className='tab'  {...a11yProps(2)} />
                            <Tab label="Apply Permission" className='tab'  {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex} >
                        <TabPanel value={value} index={0}>
                            <CustomGrid Columns={LeaveHistoryColumn} tab='LeaveHistory' Pagination={true} onclick={handelAction} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            < LeaveBalanceTab />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <CustomGrid Columns={PermissionHistoryColumn} tab='PermissionHistory' Pagination={true} onclick={handelAction} />
                        </TabPanel>
                        <TabPanel value={value} index={3} style={{ width: '100%' }}>
                            <Permission />
                        </TabPanel>
                    </SwipeableViews >
                </Box >
            </>
        );
    }

    return (<FullWidthTabs val="2" />);
}
