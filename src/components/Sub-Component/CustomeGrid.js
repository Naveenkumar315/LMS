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
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';

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
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />);
    }
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    function EnhancedTableHead(props) {
        const { order, orderBy, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {columns.map((headCell, index) => (
                        <TableCell
                            key={headCell.id}
                            style={{ minWidth: headCell.minWidth, backgroundColor: localStorage['BgColor'], color: '#fff', padding: '10px' }}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'auto', border: '1px solid ' + localStorage['BgColor'], height: 'auto' }}>
                <TableContainer >
                    <Table stickyHeader aria-label="sticky table">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
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
