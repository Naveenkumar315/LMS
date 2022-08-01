import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import axios from 'axios';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import nodeurl from '../../../nodeServer.json'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@mui/material/Typography';
import DatePicker from '../../Sub-Component/DatePicker/CustomeDatePicker';
import DateRangePicker from '../../Sub-Component/DatePicker/CustomeDateRange';
import '../../css/style.css'
import Moment from 'moment';
import CustomeGrid from '../../Sub-Component/CustomeGrid';

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
export default function ViewTimeSheet() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const [value, setValue] = useState(0);
    const [date, setDate] = useState(today);
    const [monthYear, setMonthYear] = useState({ Month: today.getMonth() + 1, Year: today.getFullYear() });
    const [dateRange, setDateRange] = useState([{ startDate: firstDay, endDate: new Date(), key: 'selection' }]);
    const [Rows, setRows] = useState([]);
    function generateArrayOfYears() {
        var max = today.getFullYear();
        var min = max - 5;
        var years = [];
        for (var i = max; i >= min; i--) { years.push(i) }
        return years;
    }
    const Years = generateArrayOfYears();
    const Month = [
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" }
    ];

    let option = Month;
    if (monthYear['Year'] === today.getFullYear())
        option = Month.slice(0, today.getMonth() + 1).reverse();

    const Columns = [
        { id: 'TaskDate', label: 'Date', minWidth: 100 },
        { id: 'ProjectName', label: 'Project', minWidth: 200 },
        { id: 'TaskDescription', label: 'Description', minWidth: 250 },
        { id: '', label: 'Actual / Estimated completion Date', minWidth: 150 },
        { id: 'Status', label: 'Status', minWidth: 100 },
        { id: 'Issues', label: 'Objects Changed', minWidth: 150 },
        { id: 'Hours', label: 'Hours', minWidth: 100 }
    ];
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const handelDateChange = (date) => {
        setDate(date);
        axios.post(nodeurl['nodeurl'], { query: 'AB_GetTimesheet "Day",' + localStorage['EmpId'] + ',"' + Moment(date).format('YYYY-MM-DD') + '","' + Moment(date).format('YYYY-MM-DD') + '",' + monthYear['Month'] + ',' + monthYear['Year'] }).then(result => {
            setRows(result.data[0]);
            console.log(result.data[0]);
        });
    }
    const handelMonthYearChange = (event) => {
        setMonthYear({ ...monthYear, [event.target.name]: parseInt(event.target.value) });
        axios.post(nodeurl['nodeurl'], { query: 'AB_GetTimesheet "Month",' + localStorage['EmpId'] + ',"' + Moment(date).format('YYYY-DD-MM') + '","' + Moment(date).format('YYYY-DD-MM') + '",' + monthYear['Month'] + ',' + monthYear['Year'] }).then(result => {
            setRows(result.data[0]);
            console.log(result.data[0]);
        });
    }
    const handelDateRangeChange = (event) => {
        setDateRange([event['selection']]);
        axios.post(nodeurl['nodeurl'], { query: 'AB_GetTimesheet "Range",' + localStorage['EmpId'] + ',"' + Moment(event['selection']['startDate']).format('YYYY-MM-DD') + '","' + Moment(event['selection']['endDate']).format('YYYY-MM-DD') + '",0,0' }).then(result => {
            setRows(result.data[0]);
            console.log(result.data[0]);

        });
    }

    return (
        <>
            <div id="viewTimesheet" style={{ flexDirection: 'row', display: 'flex' }}>
                <Box style={{ display: 'inline-block' }}>
                    <Tabs sx={{ maxWidth: { xs: 320, sm: 170 }, bgcolor: 'background.paper' }}
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        textColor="inherit"
                        style={{ color: localStorage['BgColor'] }}
                    >
                        <Tab className='tab' label="Date"  {...a11yProps(0)} />
                        <Tab className='tab' label="Range"  {...a11yProps(1)} />
                        <Tab className='tab' label="Month"  {...a11yProps(2)} />
                    </Tabs>
                    <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0}>
                            <DatePicker Date={date} OnChange={handelDateChange} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <DateRangePicker DateRange={dateRange} OnChange={handelDateRangeChange} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '335px', marginTop: '20px' }}>
                                    <div className="input-wrapper marginLeft-0" style={{ width: '86%' }}>
                                        <div className="input-holder">
                                            <select className="input-input" name="Year" value={monthYear['Year']} onChange={handelMonthYearChange}>
                                                {Years.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                            <label className="input-label">Year</label>
                                        </div>
                                    </div>
                                    <div className="input-wrapper marginLeft-0" style={{ width: '86%' }}>
                                        <div className="input-holder">
                                            <select className="input-input" name="Month" value={monthYear['Month']} onChange={handelMonthYearChange}>
                                                {option.map((item, index) => (
                                                    <option key={index} value={item['value']}>{item['label']}</option>
                                                ))}
                                            </select>
                                            <label className="input-label">Month</label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </TabPanel>

                    </SwipeableViews >
                </Box>
                <CustomeGrid Columns={Columns} Rows={Rows} tab="viewTimesheet" />
            </div>
        </>
    );
}
