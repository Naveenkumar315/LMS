import React, { useState, useEffect, } from 'react';
// import Sidebar from './Sidebar'
import axios from 'axios';
import nodeurl from '../../../nodeServer.json'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../css/style.css'
import CustomGrid from '../../Sub-Component/CustomeGrid';
import NavBar from '../../Sub-Component/NavBar';
import Loader from '../../Sub-Component/Loader';
import setTheme from '../../Sub-Component/setTheme';

export default function Home() {
    const columns = [
        { id: 'Client', label: 'Client', minWidth: 70 },
        { id: 'AssignedBY', label: 'Assigned By', minWidth: 70 },
        { id: 'AssignedTo', label: 'Assigned To', minWidth: 70 },
        { id: 'ProjectName', label: 'Project', minWidth: 70 },
        { id: 'ModuleName', label: 'Module', minWidth: 70 },
        { id: 'TaskName', label: 'Task', minWidth: 70 },
        { id: 'TaskPriority', label: 'Priority', minWidth: 80 },
        { id: 'TaskStatus', label: 'Status', minWidth: 120 },
        { id: 'ExpCompDate', label: 'Expected Completed Date', minWidth: 120 },
        { id: 'FTR', label: 'FTR', minWidth: 70 },
        { id: 'OTD', label: 'OTD', minWidth: 70 },
        { id: 'Create Sub-Task', label: 'Create Sub-Task', minWidth: 70, button: 'Re-Work', onclick: 'onclick("alert()")' }
    ];
    useEffect(() => {
        setTheme();
    }, []);


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

    function FullWidthTabs() {
        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const handleChangeIndex = (index) => {
            setValue(index);
        };

        return (
            <Box sx={{ bgcolor: 'inherit' }}>
                <AppBar position="static" style={{ width: '150px', marginLeft: '25px', backgroundColor: '#fff' }} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        style={{ color: localStorage['BgColor'] }}
                    >
                        <Tab label="Task DashBoard" style={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '16px' }} {...a11yProps(0)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
                        <CustomGrid Columns={columns} tab='TaskDashBoard' Pagination={true} />
                    </TabPanel>
                </SwipeableViews>
            </Box>
        );
    }
    // if (isLoading) return (<NavBar Component={<Loader />} />);
    return (<NavBar Component={<FullWidthTabs />} />);
}
