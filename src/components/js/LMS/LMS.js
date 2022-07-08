import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import nodeurl from '../../../nodeServer.json'
import CustomGrid from '../../Sub-Component/CustomeGrid';
import NavBar from '../../Sub-Component/NavBar';
import Loader from '../../Sub-Component/Loader';

export default function Lms() {
    const [isLoading, setIsLoading] = useState([true, true, true]);
    const [EmpId, setEmpId] = useState(localStorage['EmpId']);
    const [LeaveBalance, setLeaveBalance] = useState([]);
    const [LeaveHistory, setLeaveHistory] = useState([]);
    const [PermissionHistory, setPermissionHistory] = useState([]);
    useEffect(() => {
        axios.post(nodeurl['nodeurl'], { query: 'SP_LM_LeaveBalance ' + EmpId + '' }).then(result => {
            let data = result.data[0];
            data.push({ LeaveType: 'Total', OpeningBalance: 0, EarnedLeave: 0, LeavesTaken: 0, currentblc: 0, LOP: 0 });
            for (let i = 0; i < data.length - 1; i++) {
                data[data.length - 1].OpeningBalance += data[i].OpeningBalance;
                data[data.length - 1].EarnedLeave += data[i].EarnedLeave;
                data[data.length - 1].LeavesTaken += data[i].LeavesTaken;
                data[data.length - 1].currentblc += data[i].currentblc;
                data[data.length - 1].LOP += data[i].LOP;
            }
            setLeaveBalance(data);
            setTimeout(() => { setIsLoading(isLoading[0] = false); }, 800);
        });
        axios.post(nodeurl['nodeurl'], { query: 'SP_LM_LeaveHistory ' + EmpId + '' }).then(result => {
            setLeaveHistory(result.data[0]);
            setTimeout(() => { setIsLoading(isLoading[1] = false); }, 800);
        });
        axios.post(nodeurl['nodeurl'], { query: 'LM_PM_PermissionHistory ' + EmpId + '' }).then(result => {
            setPermissionHistory(result.data[0]);
            setTimeout(() => { setIsLoading(isLoading[2] = false); }, 800);
        });

    }, []);

    const LeaveBalanceColumn = [
        { id: 'LeaveType', label: 'Leave Type', minWidth: 200 },
        { id: 'OpeningBalance', label: 'Opening Balance', minWidth: 100 },
        { id: 'EarnedLeave', label: 'Earned Leave', minWidth: 100 },
        { id: 'LeavesTaken', label: 'Availed/Approved', minWidth: 100 },
        { id: 'currentblc', label: 'Current Balance', minWidth: 100 },
        { id: 'LOP', label: 'LOP', minWidth: 100 },
        { id: '', label: 'Action', minWidth: 100, button: 'Apply', onclick: 'onclick("alert()")' }
    ];
    const LeaveHistoryColumn = [
        { id: 'LeaveType', label: 'Leave Type', minWidth: 130 },
        { id: 'AppliedOn', label: 'Applied On', minWidth: 100 },
        { id: 'StartDate', label: 'Start Date', minWidth: 100 },
        { id: 'EndDate', label: 'End Date', minWidth: 100 },
        { id: 'No_Of_Days', label: 'No. of Days', minWidth: 110 },
        { id: 'status', label: 'Status', minWidth: 130 },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: 'Leaveoptions', label: 'Leave Option', minWidth: 200 },
        { id: '', label: 'Action', minWidth: 100, button: 'Cancel', onclick: 'onclick("alert()")' },
        { id: '', label: 'LOP', minWidth: 100, button: 'Cancel', onclick: 'alert()' }
    ];
    const PermissionHistoryColumn = [
        { id: 'PermissionType', label: 'Permission Type', minWidth: 200 },
        { id: 'AppliedOn', label: 'Applied On', minWidth: 160 },
        { id: 'StartDate', label: 'Start Date Time', minWidth: 160 },
        { id: 'EndDate', label: 'End Date Time', minWidth: 160 },
        { id: 'No_of_days', label: 'Hours', minWidth: 110 },
        { id: 'Status', label: 'Status', minWidth: 130 },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: '', label: 'Action', minWidth: 100, button: 'Cancel', onclick: 'onclick("alert()")' },
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
            <Box sx={{ bgcolor: 'inherit' }}>
                <AppBar position="static" style={{ width: '605px', marginLeft: '25px', backgroundColor: '#fff' }} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        style={{ color: localStorage['BgColor'] }}
                    >
                        <Tab label="Leave History" className='tab' {...a11yProps(0)} />
                        <Tab label="Leave Balance" className='tab'  {...a11yProps(1)} />
                        <Tab label="Permission History" className='tab'  {...a11yProps(2)} />
                        <Tab label="Apply Permission" className='tab'  {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    //axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
                        <CustomGrid Columns={LeaveHistoryColumn} Rows={LeaveHistory} Pagination={true} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <CustomGrid Columns={LeaveBalanceColumn} Rows={LeaveBalance} Pagination={false} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CustomGrid Columns={PermissionHistoryColumn} Rows={PermissionHistory} Pagination={true} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <button className="btn">Permission for Work Hours</button>
                        <button className="btn">Permission for Work from Home</button>
                    </TabPanel>
                </SwipeableViews >
            </Box >
        );
    }

    if (isLoading[0] && isLoading[1] && isLoading[2])
        return (<NavBar Component={<Loader />} />);
    else
        return (<NavBar Component={<FullWidthTabs val="2" />} />);
}
