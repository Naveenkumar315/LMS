import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Navigate } from 'react-router';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/Home.css';
import DataTableGrid from '../../Sub-Component/DataTableGrid';
import HoursMonth from '../../Sub-Component/DataCard/Hours-Month';
import HoursMonthClient from '../../Sub-Component/DataCard/Hours-Month-Client';
const Home_1 = () => {
    const nodeurl = `http://localhost:3001/`;
    const navigate = useNavigate();
    const Navigate_ = (path) => {
        navigate(path);
    }
    const logOut = () => {
        localStorage.clear();
        Navigate_('/');
    }
    const [EmpId, setEmpId] = useState(localStorage['EmpId']);
    const [totalHours, setTotalHours] = useState([]);
    const [totalHoursClient, setTotalHoursClient] = useState([]);
    const [leaveBalance, setLeaveBalance] = useState([]);
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [theamSetColors, setTheamSetColors] = useState({ 'background-color': localStorage['BgColor'], 'color': '#f5f5f5' });//1f456e,151e3d,0589a0

    const [columns, setColumns] = useState([
        { id: 'Client', label: 'Client', minWidth: 70 },
        { id: 'Assigned By', label: 'Assigned By' },
        { id: 'Assigned To', label: 'Assigned To' },
        { id: 'Project', label: 'Project' },
        { id: 'Module', label: 'Module' },
        { id: 'Task', label: 'Task' },
        { id: 'Priority', label: 'Priority', minWidth: 80 },
        { id: 'Status', label: 'Status', minWidth: 120 },
        { id: 'Expected Completed Date', label: 'Expected Completed Date', minWidth: 120 },
        { id: 'FTR', label: 'FTR' },
        { id: 'OTD', label: 'OTD' },
        { id: 'Create Sub-Task', label: 'Create Sub-Task' }
    ]);


    useEffect(() => {
        axios.post(nodeurl, { query: 'AB_Employee_Tasksummary ' + EmpId + ',1' }).then(result => { setRowData(result.data[0]); });
        axios.post(nodeurl, { query: 'SP_LM_LeaveBalance ' + EmpId + '' }).then(result => setLeaveBalance(result.data[0]));
    }, []);



    // Example load data from sever

    document.documentElement.style.setProperty('--background-color', theamSetColors['background-color']);
    document.documentElement.style.setProperty('--color', theamSetColors['color']);
    // document.documentElement.style.setProperty('--ag-row-odd-background-color', ColorLuminance(theamSetColors['background-color'], '0.0'));
    if (localStorage.length === 0) return (<Navigate to="/" />);
    return (
        <>
            <div className="header">
                <div className={`head-warrap theamSet`}>
                    <h1 className="title">Analytic Brains</h1>
                    <div className="user">
                        <h3 className="user-name">Mr Logesh</h3>
                        <a className={`button login-button theamSet`} onClick={logOut}>log out</a>
                    </div>
                </div>
            </div>
            <div style={{ 'display': 'flex', 'flexDirection': 'row' }}>
                <div className="task-tab ">
                    <div className={`task-title theamSet`}>Task DashBoard</div>
                    <div className="ag-theme-alpine" style={{ width: '98%', height: 600 }}>
                        <DataTableGrid row={rowData} key={rowData.id} colomns={columns} />
                    </div>
                </div>
                <div style={{ 'display': 'flex', 'flexDirection': 'column' }}>
                    <div className={totalHours['ForMonth'] !== 0 ? 'task-hours' : 'd-none'}>
                        <div className={`task-title theamSet`}>Total Hours For The Month</div>
                        <HoursMonth theam={theamSetColors} />
                        {/* <div className={`detail-card theamSet`}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Day</td>
                                        <td>{totalHours['ForDay']}</td>
                                    </tr>
                                    <tr>
                                        <td>Week</td>
                                        <td>{totalHours['ForWeek']}</td>
                                    </tr>
                                    <tr>
                                        <td>Month</td>
                                        <td>{totalHours['ForMonth']}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}
                    </div>

                    <div className={totalHoursClient.length > 0 ? 'task-hours-client' : 'd-none'}>
                        <div className={`task-title theamSet`}>Total Hours For The Month - Client Wise</div>
                        <HoursMonthClient theam={theamSetColors} />
                        {/* <div className={`detail-card theamSet`}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Client</th>
                                        <th>Hours</th>
                                    </tr>
                                    {totalHoursClient.map((val, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{val['Clients']}</td>
                                                <td>{val['Hours']}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                    <div className="leave-balance">
                        <div className={`leave-title theamSet`}>Leave Balance</div>
                        <div className={`detail-card theamSet`}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Leave Type</th>
                                        <th>Leave Balance</th>
                                    </tr>
                                    {leaveBalance.map((val, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{val['LeaveType'].replace(' Leave', '')}</td>
                                                <td>{val['CurrentBalance']}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};


export default Home_1;