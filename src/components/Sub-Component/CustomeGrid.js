import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faXmark } from "@fortawesome/free-solid-svg-icons";
import Switch from '@mui/material/Switch';
import { useAlert } from "react-alert";

const StickyHeadTable = forwardRef((props, ref) => {

    let EmpId = localStorage['EmpId'];
    const columns = props['Columns'];
    const tab = props['tab'];
    const alert = useAlert();
    const [rows, setRows] = useState(props['Rows'] || []);

    const [paperWidth, setPaperWidth] = useState('100%');
    const Pagination = props['Pagination'];
    const handelAction = props['onclick'];
    const IsInclude = props['IsInclude']
    const setIsApproveRejectAll = props['setIsApproveRejectAll'];
    //  const [isheaderChecked, setIsheaderChecked] = useState(true);
    useEffect(() => {
        if (tab === 'LeaveHistory') {
            axios.post(nodeurl['nodeurl'], { query: 'SP_LM_LeaveHistory ' + EmpId + '' }).then(result => {
                setRows(result.data[0]);
            });
        }
        else if (tab === 'PermissionHistory') {
            axios.post(nodeurl['nodeurl'], { query: 'LM_PM_PermissionHistory ' + EmpId + '' }).then(result => {
                setRows(result.data[0]);
            });
        }
        else if (tab === 'TaskDashBoard') {
            let IsInclude_ = 1;
            if (IsInclude) IsInclude_ = 0;
            axios.post(nodeurl['nodeurl'], { query: 'AB_Employee_Tasksummary ' + EmpId + ',' + IsInclude_ }).then(result => {
                setRows(result.data[0]);
            });
        }
        else if (tab === 'viewTimesheet') {
            // setRows();
        } else if (tab === 'HoliDayList') {
            setPaperWidth('35%');
            axios.post(nodeurl['nodeurl'], { query: 'Menus_HolidayList' }).then(result => {
                setRows(result.data[0]);
            });
        } else if (tab === 'LeaveApprovels') {
            axios.post(nodeurl['nodeurl'], { query: 'SP_LM_LEAVEDECISION ' + EmpId }).then(result => {
                console.log(result.data[0]);
                setRows(result.data[0]);
            });
        } else if (tab === 'PermissionApprovels') {
            axios.post(nodeurl['nodeurl'], { query: 'LM_PM_PermissionApproval ' + EmpId }).then(result => {
                setRows(result.data[0]);
            });
        }
        else if (tab === 'LOP') {
            axios.post(nodeurl['nodeurl'], { query: 'SP_LM_Lop_Bind ' + EmpId }).then(result => {
                console.log(result.data[0]);
                setRows(result.data[0]);
            });
        }
    }, [EmpId, tab, IsInclude]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handelPostCancel = async (id, type) => {
        const result = await handelAction(id, type);
        if (result) {
            setTimeout(() => {
                if (type === '1') {
                    axios.post(nodeurl['nodeurl'], { query: 'SP_LM_LeaveHistory ' + EmpId + '' }).then(result => {
                        setRows(result.data[0]);
                    });
                }
                else if (type === '4') {
                    axios.post(nodeurl['nodeurl'], { query: 'LM_PM_PermissionHistory ' + EmpId + '' }).then(result => {
                        setRows(result.data[0]);
                    });
                }
            }, 200);
        }
    }

    const handelCancelAction = (e) => {
        let id, type;
        if (e.target.tagName === 'path') {
            id = e.target.parentElement.id
            type = e.target.parentElement.attributes.clicktype.value;
        } else {
            id = e.target.id;
            type = e.target.attributes.clicktype.value;
        }
        handelPostCancel(id, type);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }
    useImperativeHandle(ref, () => ({
        handelApproveReject(isAll, isApprove, tab) {
            let Row_ = [];
            if (isAll) {
                Row_ = rows;
            } else {
                Row_ = rows.filter((item) => { return item['checked'] })
            }
            Row_.forEach((item) => {
                item['isApproved'] = isApprove;
            });
            let SP = '';
            if (tab === 4) SP = 'LM_LeaveApproveReject_Wrapper';
            else if (tab === 5) SP = '';
            else if (tab === 6) SP = '';
            axios.post(nodeurl['nodeurl'] + 'Update', { SP: SP, UpdateJson: JSON.stringify(rows) }).then(result => {
                if (isApprove === 1) alert.success('Approved Successfully.')
                else alert.show('Rejected Successfully.');
            });
        },

    }));

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
                            key={index}
                            style={{ minWidth: headCell.minWidth, backgroundColor: localStorage['BgColor'], color: '#fff', padding: '10px' }}
                            sortDirection={orderBy === headCell['id'] ? order : false}
                        >
                            {/* {headCell['field'] === 'CheckBox' && headCell['type'] === 5 ? <input type="checkbox"
                                checked={isheaderChecked}
                                onChange={(e) => {
                                    setIsheaderChecked(e.target.checked);
                                    for (let i = 0; i < rows.length; i++) {
                                        rows[i]['checked'] = e.target.checked;
                                    }
                                }}></input> : null} */}
                            {
                                headCell['sort'] ? <TableSortLabel
                                    active={orderBy === headCell['id']}
                                    direction={orderBy === headCell['id'] ? order : 'asc'}
                                    onClick={createSortHandler(headCell['id'])}
                                >
                                    {headCell['label']}
                                    {orderBy === headCell['id'] ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel> : (headCell['label'])}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead >
        );
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    EnhancedTableHead.propTypes = {
        // numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        // onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        // rowCount: PropTypes.number.isRequired,
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
            <Paper sx={{ width: paperWidth, overflow: 'auto', border: '1px solid ' + localStorage['BgColor'], height: 'auto' }}>
                <TableContainer className='scrollbar' >
                    <Table stickyHeader aria-label="sticky table">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {rows['length'] > 0 ? stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow tabIndex={-1} key={index}>
                                            {columns.map((column, index_) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={index_} align={column.align} style={column.type === 6 ? { padding: '0' } : { padding: '9px' }}>
                                                        {column.type === 1 ? <button className='btnAction' ><FontAwesomeIcon id={row.EmpleaveApplicationID} clicktype={column.type} onClick={handelCancelAction} icon={faXmark} /></button> : value}
                                                        {column.type === 2 && row.Reason === 'Timesheet not filled' ? <button className='btnAction' ><FontAwesomeIcon id={row.EmpleaveApplicationID} clicktype={column.type} onClick={handelCancelAction} icon={faLocationArrow} /></button> : ''}
                                                        {column.type === 3 && row.LeaveType !== 'Total' ? <button className='btnAction' id={row.LeaveID} clicktype={column.type} onClick={handelCancelAction}>{column.button}</button> : ''}
                                                        {column.type === 4 ? <button className='btnAction' ><FontAwesomeIcon id={row.PermissionApplicationID} clicktype={column.type} onClick={handelCancelAction} icon={faXmark} /></button> : ''}
                                                        {column.type === 5 ?
                                                            <Switch size="small" name="checked" index={index} onChange={(e) => {

                                                                const switch_ = e.target.closest('.MuiSwitch-switchBase')
                                                                rows[parseInt(switch_.attributes.index.value)]['checked'] = e.target.checked;
                                                                let arr = rows.filter((item) => { return item['checked'] });
                                                                console.log(arr);

                                                                if (arr['length'] === 0)
                                                                    setIsApproveRejectAll(true);
                                                                else
                                                                    setIsApproveRejectAll(false);
                                                            }} /> : null}
                                                        {column.type === 6 ? <textarea value={row.comments} rows={2} cols={15} /> : ''}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                }) :
                                <TableRow>
                                    <TableCell key={-1} colSpan={columns['length']} style={{ textAlign: "center" }}>No Rows Found...!</TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
                {rows['length'] > 0 && getPagination()}
            </Paper >

        </>
    );
});
export default StickyHeadTable