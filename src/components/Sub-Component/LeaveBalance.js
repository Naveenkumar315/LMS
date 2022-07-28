import React, { useState, useEffect, } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Moment from 'moment';
import axios from 'axios';
import nodeurl from '../../nodeServer.json';

export default function LeaveBalanceTab(props) {
    const [expanded, setExpanded] = useState(false);
    const [ActiveTab, setActiveTab] = useState(1);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setActiveTab(panel + 1);
    };

    const LeaveApplyTab = () => {
        const [isVisavle, setIsVisavle] = useState(false);
        const [Option, setOption] = useState([{}]);
        const [Details, setDetails] = useState({
            EmpId: localStorage['EmpId'], startDate: Moment(new Date).format('YYYY-MM-DD'), endDate: Moment(new Date).format('YYYY-MM-DD'),
            Duration: 0, NoOfDays: '0.00', Reason: '', LeaveOption: 0, Dates: Moment(new Date).format('YYYY-MM-DD'), LeaveId: 1
        });
        const handelOnChange = (event) => {
            debugger
            Details['LeaveId'] = ActiveTab;
            setDetails({ ...Details, [event.target.name]: event.target.value });
            if (event.target.name === 'LeaveOption') {
                if (event.target.value === '1') {
                    setOption(props['ComDate']);
                    setIsVisavle(true);
                }
                else if (event.target.value === '2') {
                    setOption(props['PrevComDate']);
                    setIsVisavle(true);
                } else {
                    setIsVisavle(false);
                }
            }
        }
        const handelClick = () => {
            axios.post(nodeurl['nodeurl'] + 'Update', { SP: 'Sp_LM_Leaveapplication ', UpdateJson: JSON.stringify(Details) }).then(result => {
                console.log(result.data[0]);
            });
        }
        return (
            <>
                <div style={{ margin: '30px 0', width: '99%' }}>
                    <div className="input-wrapper marginLeft-0">
                        <div className="input-holder">
                            <input type="text" className="input-input" name="startDate" value={Details['startDate']} onChange={handelOnChange} />
                            <label className="input-label">Start Date</label>
                        </div>
                    </div>

                    <div className="input-wrapper marginLeft-0">
                        <div className="input-holder">
                            <input type="text" className="input-input" name="endDate" value={Details['endDate']} onChange={handelOnChange} />
                            <label className="input-label">End Date</label>
                        </div>
                    </div>
                    <div className="input-wrapper marginLeft-0">
                        <div className="input-holder">
                            <select className="input-input" name="Duration" value={Details['Duration']} onChange={handelOnChange}>
                                <option value="0">Full Day</option>
                                <option value="1">1st Half</option>
                                <option value="2">2nd Half</option>
                            </select>
                            <label className="input-label">Duration</label>
                        </div>
                    </div>
                    <div className="input-wrapper marginLeft-0">
                        <div className="input-holder">
                            <input type="text" className="input-input" name="NoOfDays" value={Details['NoOfDays']} onChange={handelOnChange} />
                            <label className="input-label">No.of Days</label>
                        </div>
                    </div>
                    <div className="input-wrapper marginLeft-0">
                        <div className="input-holder">
                            <input type="text" className="input-input" name="Reason" value={Details['Reason']} onChange={handelOnChange} />
                            <label className="input-label">Reason</label>
                        </div>
                    </div>
                    <div className="input-wrapper marginLeft-0">
                        <div className="input-holder">
                            <select className="input-input" name="LeaveOption" value={Details['LeaveOption']} onChange={handelOnChange}>
                                <option value="0">Deduct from my leave balance</option>
                                <option value="1">Compensate leave in upcoming week</option>
                                <option value="2">Use Previously Compensated working day</option>
                            </select>
                            <label className="input-label">Leave Option</label>
                        </div>
                    </div>
                    {isVisavle && <div className="input-wrapper marginLeft-0">
                        <div className="input-holder">
                            <select className="input-input" name="Dates" value={Details['Dates']} onChange={handelOnChange}>
                                {Option.length > 0 ? Option.map((item, index) => (
                                    <option key={index} value={item['Date_']}>{item['Date']}</option>
                                )) : <option value="1" disabled selected>No Dates Available</option>}
                            </select>
                            <label className="input-label">Dates</label>
                        </div>
                    </div>}
                    <div>
                        <button className="btn marginLeft-0" onClick={handelClick}>Apply</button>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div style={{ width: '95%', border: '1px solid' + localStorage['BgColor'], borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }}>
            <Accordion >
                <AccordionSummary style={{ color: localStorage['Color'], backgroundColor: localStorage['BgColor'], }}>
                    <Typography component={"span"} sx={{ width: '16%', flexShrink: 0 }}>
                        Leave Type
                    </Typography>
                    <Typography component={"span"} sx={{ width: '16%', flexShrink: 0 }}>
                        Opening Balance
                    </Typography>
                    <Typography component={"span"} sx={{ width: '16%', flexShrink: 0 }}>
                        Earned Leave
                    </Typography>
                    <Typography component={"span"} sx={{ width: '16%', flexShrink: 0 }}>
                        Availed/Approved
                    </Typography>
                    <Typography component={"span"} sx={{ width: '16%', flexShrink: 0 }}>
                        Current Balance
                    </Typography>
                    <Typography component={"span"} sx={{ width: '16%', flexShrink: 0 }}>
                        LOP
                    </Typography>
                </AccordionSummary>

            </Accordion>

            {props['Rows'].map((column, index) => (
                <Accordion key={index} expanded={expanded === index} onChange={column['LeaveType'] === 'Total' ? handleChange(-1) : handleChange(index)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography component={"span"} sx={{ width: '16%', flexShrink: 0 }}>
                            {column['LeaveType']}
                        </Typography>
                        <Typography component={"span"} sx={{ width: '16%', flexShrink: 0, padding: '0 30px' }}>
                            {column['OpeningBalance']}
                        </Typography>
                        <Typography component={"span"} sx={{ width: '16%', flexShrink: 0, padding: '0 30px' }}>
                            {column['EarnedLeave']}
                        </Typography>
                        <Typography component={"span"} sx={{ width: '16%', flexShrink: 0, padding: '0 30px' }}>
                            {column['LeavesTaken']}
                        </Typography>
                        <Typography component={"span"} sx={{ width: '16%', flexShrink: 0, padding: '0 30px' }}>
                            {column['currentblc']}
                        </Typography>
                        <Typography component={"span"} sx={{ width: '16%', flexShrink: 0, padding: '0 30px' }}>
                            {column['LOP']}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component={"span"}>
                            <LeaveApplyTab />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}



        </div>
    );
}
