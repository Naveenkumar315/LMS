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
    const [isLoading, setIsLoading] = useState(true);
    const [EmpId, setEmpId] = useState(localStorage['EmpId']);
    const [rowData, setRowData] = useState([]);
    const [columns, setColumns] = useState([
        { id: 'Client', label: 'Client', minWidth: 70 },
        { id: 'Assigned By', label: 'Assigned By', minWidth: 70 },
        { id: 'Assigned To', label: 'Assigned To', minWidth: 70 },
        { id: 'Project', label: 'Project', minWidth: 70 },
        { id: 'Module', label: 'Module', minWidth: 70 },
        { id: 'Task', label: 'Task', minWidth: 70 },
        { id: 'Priority', label: 'Priority', minWidth: 80 },
        { id: 'Status', label: 'Status', minWidth: 120 },
        { id: 'Expected Completed Date', label: 'Expected Completed Date', minWidth: 120 },
        { id: 'FTR', label: 'FTR', minWidth: 70 },
        { id: 'OTD', label: 'OTD', minWidth: 70 },
        { id: 'Create Sub-Task', label: 'Create Sub-Task', minWidth: 70, button: 'Re-Work', onclick: 'onclick("alert()")' }
    ]);
    useEffect(() => {
        setTheme();
        axios.post(nodeurl['nodeurl'], { query: 'AB_Employee_Tasksummary ' + EmpId + ',1' }).then(result => {
            setRowData(result.data[0]);
            setTimeout(() => { setIsLoading(false); }, 1000);
        });
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
                        <CustomGrid Rows={rowData} Columns={columns} Pagination={true} />
                    </TabPanel>
                </SwipeableViews>
            </Box>
        );
    }
    if (isLoading) return (<NavBar Component={<Loader />} />);
    return (<NavBar Component={<FullWidthTabs />} />);
}
