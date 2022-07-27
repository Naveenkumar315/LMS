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
import ViewTimeSheet from './ViewTimeSheet'
import TimeSheetGrid from '../../Sub-Component/TimeSheetGrid';
import NavBar from '../../Sub-Component/NavBar';
import Loader from '../../Sub-Component/Loader';
import setTheme from '../../Sub-Component/setTheme';


export default function EnterTimeSheet() {
    const [EmpId, setEmpId] = useState(localStorage['EmpId']);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [EnterTimeSheet, setEnterTimeSheet] = useState([]);
    const [taskDate, setTaskDate] = useState((new Date().toLocaleDateString()).toString());
    const EnterTimeSheetColumn = [
        { field: 'Row', headerName: 'S No.', minWidth: 100, type: 'lable' },
        { field: 'ProjectId', headerName: 'Project', minWidth: 100, type: 'select' },
        { field: 'ModuleId', headerName: 'Module', minWidth: 100, type: 'select' },
        { field: 'TaskName', headerName: 'Task', minWidth: 100, type: 'select' },
        { field: 'TaskDescription', headerName: 'Description', minWidth: 200, type: 'textarea' },
        { field: 'Issues', headerName: 'Issue', minWidth: 100, type: 'input' },
        { field: 'Object', headerName: 'Object', minWidth: 100, type: 'input' },
        { field: 'Status', headerName: 'Status', minWidth: 100, type: 'select' },
        { field: 'Hours', headerName: 'Hours', minWidth: 100, type: 'number' },
        { field: 'Remove', headerName: 'Hours', minWidth: 100, type: 'button' }
    ];
    useEffect(() => {
        setTheme();
        axios.post(nodeurl['nodeurl'], { query: 'AB_Inprogressgrid ' + EmpId + ',"' + taskDate + '"' }).then(result => {
            setEnterTimeSheet(result.data[0]);
            setIsLoading(false);
            console.log(result.data[0]);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
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

        // setTimeout(() => {
        //     document.querySelectorAll('div.MuiButtonBase-root')[0].addEventListener('click', () => { handleChange('', value - 1) });
        //     document.querySelectorAll('div.MuiButtonBase-root')[1].addEventListener('click', () => { handleChange('', value + 1) });
        // }, 1000);
        return (
            <Box sx={{ bgcolor: 'inherit' }}>
                <AppBar position="static" style={{ width: '305px', marginLeft: '25px', backgroundColor: '#fff' }} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        style={{ color: localStorage['BgColor'] }}
                    >
                        <Tab label="Enter TimeSheet" className='tab' {...a11yProps(0)} />
                        <Tab label="View TimeSheet" className='tab'  {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    //axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
                        <TimeSheetGrid Columns={EnterTimeSheetColumn} Rows={EnterTimeSheet} Pagination={false} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ViewTimeSheet />
                    </TabPanel>

                </SwipeableViews >
            </Box >
        );
    }

    if (isLoading)
        return (<NavBar Component={<Loader />} />);
    else
        return (<NavBar Component={<FullWidthTabs val="2" />} />);
}
