import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nodeurl from '../../nodeServer.json'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function StickyHeadTable(props) {
    let EmpId = localStorage['EmpId'];
    const columns = props['Columns'];
    const tab = props['tab']
    const [rows, setRows] = useState([]);
    const Pagination = props['Pagination']
    const handelAction = props['onclick']

    useEffect(() => {
        if (tab === 'LeaveHistory')
            axios.post(nodeurl['nodeurl'], { query: 'SP_LM_LeaveHistory ' + EmpId + '' }).then(result => {
                setRows(result.data[0]);
            });
        else if (tab === 'PermissionHistory')
            axios.post(nodeurl['nodeurl'], { query: 'LM_PM_PermissionHistory ' + EmpId + '' }).then(result => {
                setRows(result.data[0]);
            });
        else if (tab === 'TaskDashBoard')
            axios.post(nodeurl['nodeurl'], { query: 'AB_Employee_Tasksummary ' + EmpId + ',1' }).then(result => {
                setRows(result.data[0])
            });
        else if (tab === 'viewTimesheet') {
            setRows(props['Rows']);
        }
    }, [EmpId, tab, props['Rows']]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getPagination = () => {
        if (Pagination)
            return (<TablePagination
                id='test'
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />);
    }

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'auto', border: '1px solid ' + localStorage['BgColor'], height: 'auto' }}>
                <TableContainer >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead style={{ color: localStorage['BgColor'] }}>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, backgroundColor: localStorage['BgColor'], color: '#fff', padding: '10px' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column, index) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={index} align={column.align} style={{ padding: '9px' }}>
                                                        {column.type === 1 ? <button className='btnAction' id={row.EmpleaveApplicationID} clicktype={column.type} onClick={handelAction}>{column.button}</button> : value}
                                                        {column.type === 2 ? <button className='btnAction' id={row.EmpleaveApplicationID} clicktype={column.type} onClick={handelAction}>{column.button}</button> : ''}
                                                        {column.type === 3 && row.LeaveType !== 'Total' ? <button className='btnAction' id={row.LeaveID} clicktype={column.type} onClick={handelAction}>{column.button}</button> : ''}
                                                        {column.type === 4 ? <button className='btnAction' id={row.PermissionApplicationID} clicktype={column.type} onClick={handelAction}>{column.button}</button> : ''}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {getPagination()}
            </Paper >

        </>
    );
}
