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
//import TimeSheetGrid from '../../Sub-Component/TimeSheetGrid';
import Loader from '../../Sub-Component/Loader';
import setTheme from '../../Sub-Component/setTheme';
import EnterTimeSheet from './EnterTimeSheet';


export default function TimeSheet() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTheme();
        setIsLoading(false);
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

    function FullWidthTabs(props) {
        const [value, setValue] = useState(0);
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const handleChangeIndex = (index) => {
            setValue(index);
        };
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
                        <EnterTimeSheet />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ViewTimeSheet />
                    </TabPanel>

                </SwipeableViews >
            </Box >
        );
    }

    if (isLoading)
        return (<Loader />);
    else
        return (<FullWidthTabs val="2" />);
}
