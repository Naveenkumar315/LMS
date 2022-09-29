import React, { useState, useRef, useEffect } from 'react';
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
import { useAlert } from "react-alert";
import { confirm } from "react-confirm-box";

export default function Lms() {
    const alert = useAlert();
    const EmpId = localStorage['EmpId'];
    // const [isApproveRejectAll, setIsApproveRejectAll] = useState(false);
    const optionsWithLabelChange = {
        closeOnOverlayClick: true,
        labels: {
            confirmable: "Confirm",
            cancellable: "Cancel"
        }
    };
    if (EmpId === '40')
        var isManager = true;
    useEffect(() => {
        setTheme();

    }, []);

    const approvelRef = useRef();
    const handelConfirm = async (msg, id, type, query) => {
        const result = await confirm(msg, optionsWithLabelChange);
        if (result) {
            axios.post(nodeurl['nodeurl'], { query: query + ' ' + id }).then(result => {
                let status = result.data[0][0]['Result'];
                if (type === '1') {
                    if (status === 0) alert.show("Leave Cancellation Request has been sent to the Reporting Manager.");
                    else if (status === 1) alert.success("Leave has been cancelled successfully.");
                    else alert.error("You are Not Allowed to Cancel this Leave.");
                }
                else if (type === '2') {

                } else if (type === '4') {
                    if (status === 0) { alert.show("Permission Cancellation Request has been Sent to the Reporting Manager."); }
                    else if (status === 1) { alert.success("Permission has been Cancelled Successfully.") }
                    else { alert.error("You are Not Allowed to Cancel this Leave.") }
                }
            });
        }
        return result;
    };
    const handelAction = async (id, type) => {
        let query = '', msg = 'Aru you surely want to cancel?';
        if (type === '1') {
            query = 'SP_LM_CheckCancelStatus';
        }
        else if (type === '2') {
            query = 'SP_LM_LOP_Cancel_Request';
        }
        else if (type === '4') {
            query = 'LM_PM_ReturnCancelStatus';
        }
        return handelConfirm(msg, id, type, query);
    }

    const LeaveHistoryColumn = [
        { id: 'LeaveType', label: 'Leave Type', minWidth: 115, sort: true },
        { id: 'AppliedOn', label: 'Applied On', minWidth: 115, sort: true },
        { id: 'StartDate', label: 'Start Date', minWidth: 110, sort: true },
        { id: 'EndDate', label: 'End Date', minWidth: 100, sort: true },
        { id: 'No_Of_Days', label: 'No. of Days', minWidth: 110, sort: true },
        { id: 'status', label: 'Status', minWidth: 120, sort: true },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: 'Leaveoptions', label: 'Leave Option', minWidth: 200, sort: true },
        { id: '', label: 'Action', minWidth: 100, button: 'Cancel', type: 1 },
        { id: '', label: 'LOP', minWidth: 70, button: 'Cancel', type: 2 }
    ];
    const PermissionHistoryColumn = [
        { id: 'PermissionType', label: 'Permission Type', minWidth: 200, sort: true },
        { id: 'AppliedOn', label: 'Applied On', minWidth: 160, sort: true },
        { id: 'StartDate', label: 'Start Date Time', minWidth: 160, sort: true },
        { id: 'EndDate', label: 'End Date Time', minWidth: 160, sort: true },
        { id: 'No_of_days', label: 'Hours', minWidth: 110 },
        { id: 'Status', label: 'Status', minWidth: 130, sort: true },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: '', label: 'Action', minWidth: 100, button: 'Cancel', type: 4, onclick: handelAction },
    ];
    const LeaveApprovelColumn = [
        { id: '', label: '', minWidth: 10, field: 'CheckBox', type: 5 },
        { id: 'FirstName', label: 'Name', minWidth: 115, sort: true },
        { id: 'LeaveType', label: 'Leave Type', minWidth: 100, sort: true },
        { id: 'StartDate', label: 'Start Date', minWidth: 100, sort: true },
        { id: 'EndDate', label: 'End Date', minWidth: 100, sort: true },
        { id: 'No_Of_Days', label: 'No. of Days', minWidth: 85, sort: true },
        { id: 'Applied', label: 'Applied On', minWidth: 100, sort: true },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: 'CurrentBalance', label: 'Current Balance', minWidth: 70 },
        { id: 'Leaveoptions', label: 'Leave Option', minWidth: 200, sort: true },
        { id: 'Status', label: 'Status', minWidth: 80, sort: true },
        { id: 'Comments', label: 'Comments', minWidth: 100, field: 'textArea', type: 6 },
    ];
    const PermissionApprovelColumn = [
        { id: '', label: '', minWidth: 10, field: 'CheckBox', type: 5 },
        { id: 'FirstName', label: 'Name', minWidth: 115, sort: true },
        { id: 'PermissionType', label: 'Permission Type', minWidth: 100, sort: true },
        { id: 'StartDate', label: 'Start Date', minWidth: 100, sort: true },
        { id: 'EndDate', label: 'End Date', minWidth: 100, sort: true },
        { id: 'No_of_days', label: 'No. of Days', minWidth: 85, sort: true },
        { id: 'AppliedOn', label: 'Applied On', minWidth: 100, sort: true },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: 'Status', label: 'Status', minWidth: 80, sort: true },
        { id: 'Comments', label: 'Comments', minWidth: 100, field: 'textArea', type: 6 },
    ];
    const LOPRequestColumn = [
        { id: '', label: '', minWidth: 10, field: 'CheckBox', type: 5 },
        { id: 'FirstName', label: 'Name', minWidth: 115, sort: true },
        // { id: 'LeaveType', label: 'Leave Type', minWidth: 100, sort: true },
        { id: 'StartDate', label: 'Start Date', minWidth: 100, sort: true },
        { id: 'EndDate', label: 'End Date', minWidth: 100, sort: true },
        { id: 'NoofDays', label: 'No. of Days', minWidth: 100, sort: true },
        { id: 'AppliedOn', label: 'Applied On', minWidth: 100, sort: true },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: 'TimesheetHours', label: 'Timesheet Hours', minWidth: 70 },
        { id: 'LeaveHours', label: 'Leave Hours', minWidth: 80, sort: true },
        { id: 'Comments', label: 'Comments', minWidth: 100, field: 'textArea', type: 6 },
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
        const [value, setValue] = useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
            setApproveRejectAll(true);
        };

        const handleChangeIndex = (index) => {
            setValue(index);
        };

        const [ApproveRejectAll, setApproveRejectAll] = useState(true);
        const setIsApproveRejectAll = (param) => {
            setApproveRejectAll(param);
        }
        return (
            <>
                <div style={{ float: 'right', marginTop: '-2px', zIndex: 999, marginRight: '25px', display: 'inline-block' }} className={[4, 5, 6].includes(value) ? '' : 'hidden'}>
                    <button className="btn marginLeft-0 btnApproveRejectAll" style={{ marginBottom: 0, width: '100px', padding: '10px' }} onClick={() => approvelRef.current.handelApproveReject(ApproveRejectAll, 1, value)}>Approve{ApproveRejectAll ? ' All' : ''}</button>
                    <button className="btn marginLeft-0 marginRight-0 btnApproveRejectAll" style={{ marginBottom: 0, width: '100px', padding: '10px' }} onClick={() => approvelRef.current.handelApproveReject(ApproveRejectAll, 2, value)}>Reject{ApproveRejectAll ? ' All' : ''}</button>
                </div>
                <Box sx={{ bgcolor: 'inherit' }}>
                    <AppBar position="static" style={{ width: 'max-content', marginLeft: '25px', backgroundColor: '#fff' }} >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="inherit"
                            style={{ color: localStorage['BgColor'] }}>
                            <Tab label="Leave History" className='tab' {...a11yProps(0)} />
                            <Tab label="Leave Balance" className='tab'  {...a11yProps(1)} />
                            <Tab label="Permission History" className='tab'  {...a11yProps(2)} />
                            <Tab label="Apply Permission" className='tab'  {...a11yProps(3)} />
                            {isManager && <Tab label="Leave Approvals" className='tab' {...a11yProps(4)} />}
                            {isManager && <Tab label="Permission Approvals" className='tab' {...a11yProps(5)} />}
                            {isManager && <Tab label="LOP Request" className='tab' {...a11yProps(6)} />}
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
                        <TabPanel value={value} index={4}>
                            <CustomGrid Columns={LeaveApprovelColumn} ref={approvelRef} tab='LeaveApprovels' setIsApproveRejectAll={setIsApproveRejectAll} Pagination={true} checkBox={true} />
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <CustomGrid Columns={PermissionApprovelColumn} ref={approvelRef} tab='PermissionApprovels' setIsApproveRejectAll={setIsApproveRejectAll} Pagination={true} checkBox={true} />
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            <CustomGrid Columns={LOPRequestColumn} ref={approvelRef} tab='LOP' Pagination={true} setIsApproveRejectAll={setIsApproveRejectAll} checkBox={true} />
                        </TabPanel>
                    </SwipeableViews >
                </Box >
            </>
        );
    }

    return (<FullWidthTabs val="2" />);
}
