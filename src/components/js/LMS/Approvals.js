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
import { useAlert } from "react-alert";

export default function Approvals() {
    const alert = useAlert();
    const EmpId = localStorage['EmpId'];
    const [EmpList, setEmpList] = useState([]);
    const [selectedEmpId, setSelectedEmpId] = useState(0);
    // const [isApproveRejectAll, setIsApproveRejectAll] = useState(false);
    const optionsWithLabelChange = {
        closeOnOverlayClick: true,
        labels: {
            confirmable: "Confirm",
            cancellable: "Cancel"
        }
    };

    useEffect(() => {
        setTheme();
        axios.post(nodeurl['nodeurl'], { query: 'LM_List_of_Emp ' + EmpId }).then(result => {
            setEmpList(result.data[0]);
        });
    }, [EmpId]);

    const approvelRef = useRef();


    const LeaveApprovelColumn = [
        { id: '', label: '', minWidth: 10, field: 'CheckBox', type: 5 },
        { id: 'FirstName', label: 'Name', minWidth: 115, sort: true },
        { id: 'LeaveType', label: 'Leave Type', minWidth: 100, sort: true },
        { id: 'StartDate', label: 'Start Date', minWidth: 100, sort: true },
        { id: 'EndDate', label: 'End Date', minWidth: 100, sort: true },
        { id: 'Applied', label: 'Applied On', minWidth: 100, sort: true },
        { id: 'No_Of_Days', label: 'No. of Days', minWidth: 85, sort: true },
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
        { id: 'AppliedOn', label: 'Applied On', minWidth: 100, sort: true },
        { id: 'No_of_days', label: 'No. of Days', minWidth: 85, sort: true },
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
        { id: 'AppliedOn', label: 'Applied On', minWidth: 100, sort: true },
        { id: 'NoofDays', label: 'No. of Days', minWidth: 100, sort: true },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: 'TimesheetHours', label: 'Timesheet Hours', minWidth: 70 },
        { id: 'LeaveHours', label: 'Leave Hours', minWidth: 80, sort: true },
        { id: 'Comments', label: 'Comments', minWidth: 100, field: 'textArea', type: 6 },
    ];
    const EmpPerColumn = [
        { id: 'PermissionType', label: 'Permission Type', minWidth: 100, sort: true },
        { id: 'StartDate', label: 'Start Date', minWidth: 100, sort: true },
        { id: 'EndDate', label: 'End Date', minWidth: 100, sort: true },
        { id: 'AppliedOn', label: 'Applied On', minWidth: 100, sort: true },
        { id: 'No_of_days', label: 'No. of Days', minWidth: 85, sort: true },
        { id: 'Status', label: 'Status', minWidth: 80, sort: true },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: 'Day', label: 'Day', minWidth: 100 }];

    const EmpLeaveColumn = [
        { id: 'LeaveType', label: 'Leave Type', minWidth: 100, sort: true },
        { id: 'StartDate', label: 'Start Date', minWidth: 100, sort: true },
        { id: 'EndDate', label: 'End Date', minWidth: 100, sort: true },
        { id: 'AppliedOn', label: 'Applied On', minWidth: 100, sort: true },
        { id: 'No_Of_Days', label: 'No. of Days', minWidth: 85, sort: true },
        { id: 'status', label: 'Status', minWidth: 80, sort: true },
        { id: 'Reason', label: 'Reason', minWidth: 180 },
        { id: 'Leaveoptions', label: 'Leave Option', minWidth: 180 },
        { id: 'Day', label: 'Day', minWidth: 100 }];
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
                <div style={{ float: 'right', marginTop: '-2px', zIndex: 999, marginRight: '25px', display: 'inline-block' }} >
                    {[0, 1, 2].includes(value) && <><button className="btn marginLeft-0 btnApproveRejectAll" style={{ marginBottom: 0, width: '100px', padding: '10px' }} onClick={() => approvelRef.current.handelApproveReject(ApproveRejectAll, 1, value)}>Approve{ApproveRejectAll ? ' All' : ''}</button>
                        <button className="btn marginLeft-0 marginRight-0 btnApproveRejectAll" style={{ marginBottom: 0, width: '100px', padding: '10px' }} onClick={() => approvelRef.current.handelApproveReject(ApproveRejectAll, 2, value)}>Reject{ApproveRejectAll ? ' All' : ''}</button></>}
                    {[3, 4].includes(value) && <div className="input-wrapper timeSheetDate" style={{ width: '250px', height: '35px', marginTop: '10px' }} >
                        <div className="input-holder">
                            <select className="input-input" style={{ width: '100%', fontSize: '17px' }} onChange={(e) => {
                                approvelRef.current.setSelectedEmpId_(e.target.value, value)
                            }} name="taskDate">
                                <option key='-1' value='-1'>--Select--</option>
                                {EmpList.map((item, index) => (
                                    <option key={index} value={item['value']}>{item['text']}</option>
                                ))}
                            </select>
                            <label className="input-label" style={{ height: '60px' }}>Employee</label>
                        </div>
                    </div>}
                </div>

                <Box sx={{ bgcolor: 'inherit' }}>
                    <AppBar position="static" style={{ width: 'max-content', marginLeft: '25px', backgroundColor: '#fff' }} >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="inherit"
                            style={{ color: localStorage['BgColor'] }}>
                            <Tab label="Leave Approvals" className='tab' {...a11yProps(4)} />
                            <Tab label="Permission Approvals" className='tab' {...a11yProps(5)} />
                            <Tab label="LOP Request" className='tab' {...a11yProps(6)} />
                            <Tab label="Emp Leave History" className='tab' {...a11yProps(7)} />
                            <Tab label="Emp Per History" className='tab' {...a11yProps(8)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex} >

                        <TabPanel value={value} index={0}>
                            <CustomGrid Columns={LeaveApprovelColumn} ref={approvelRef} tab='LeaveApprovels' setIsApproveRejectAll={setIsApproveRejectAll} Pagination={true} checkBox={true} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <CustomGrid Columns={PermissionApprovelColumn} ref={approvelRef} tab='PermissionApprovels' setIsApproveRejectAll={setIsApproveRejectAll} Pagination={true} checkBox={true} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <CustomGrid Columns={LOPRequestColumn} ref={approvelRef} tab='LOP' Pagination={true} setIsApproveRejectAll={setIsApproveRejectAll} checkBox={true} />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <CustomGrid Columns={EmpLeaveColumn} ref={approvelRef} tab='EmpLeaveColumn' EmpId={selectedEmpId} Pagination={true} />
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <CustomGrid Columns={EmpPerColumn} ref={approvelRef} tab='EmpPerColumn' EmpId={selectedEmpId} Pagination={true} />
                        </TabPanel>
                    </SwipeableViews >
                </Box >
            </>
        );
    }

    return (<FullWidthTabs val="2" />);
}
