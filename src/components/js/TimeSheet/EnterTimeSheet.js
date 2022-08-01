import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nodeurl from '../../../nodeServer.json'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function EnterTimeSheet() {
    const EmpId = localStorage['EmpId'];
    const [expanded, setExpanded] = useState(false);
    const [ActiveTab, setActiveTab] = useState(1);
    const [Details, setDetails] = useState([]);
    const [Project, setProject] = useState([]);
    const [Module, setModule] = useState([]);
    const [Tasks, setTasks] = useState([]);
    const [Status, setStatus] = useState([]);
    const taskDate = (new Date().toLocaleDateString()).toString();
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
        axios.post(nodeurl['nodeurl'], { query: 'AB_Inprogressgrid ' + EmpId + ',"' + taskDate + '"' }).then(result => {
            setDetails(result.data[0]);
            setProject(result.data[1]);
            setModule(result.data[2]);
            setStatus(result.data[3]);
        });
    }, [EmpId, taskDate]);
    const handleChange = (panel) => (event, isExpanded) => {
        if (panel === -1) return;
        setExpanded(isExpanded ? panel : false);
        setActiveTab(panel + 1);
    };
    const LeaveApplyTab = () => {
        const [isVisavle, setIsVisavle] = useState(false);
        const [Option, setOption] = useState([{}]);
        const [IsOpen, setIsOpen] = useState([false, false]);
        const [Details, setDetails] = useState({});

        // const handelOnChange = (event) => {
        //     Details['LeaveId'] = ActiveTab;
        //     setDetails({ ...Details, [event.target.name]: event.target.value });
        //     if (event.target.name === 'LeaveOption') {
        //         if (event.target.value === '1') {
        //             setOption(ComDate);
        //             setIsVisavle(true);
        //         }
        //         else if (event.target.value === '2') {
        //             setOption(PrevComDate);
        //             setIsVisavle(true);
        //         } else {
        //             setIsVisavle(false);
        //         }
        //     }
        // }
        const handelClick = () => {
            // axios.post(nodeurl['nodeurl'] + 'Update', { SP: 'Sp_LM_Leaveapplication ', UpdateJson: JSON.stringify(Details) }).then(result => {
            // });
        }
        const handelModuleChange = (event) => {
            axios.post(nodeurl['nodeurl'], { query: 'AB_TaskList ' + 1 + ',' + 1 + ',' + 0 + ',' + EmpId }).then(result => {
                setTasks(result.data[0]);
            });
        }
        return (
            <>
                <div style={{ margin: '15px 0 0 0', width: '99%' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '70%' }}>
                            <div className="input-wrapper marginLeft-0" style={{ width: '30%' }}>
                                <div className="input-holder">
                                    <select className="input-input" name="Project" value={1}>
                                        {Project.map((item, index) => (
                                            <option key={index} value={item['ProjectId']}>{item['ProjectName']}</option>
                                        ))}
                                    </select>
                                    <label className="input-label">Project</label>
                                </div>
                            </div>

                            <div className="input-wrapper marginLeft-0" style={{ width: '30%' }}>
                                <div className="input-holder">
                                    <select className="input-input" name="Module" onChange={handelModuleChange} >
                                        {Module.filter((item) => { return item['ProjectId'] === 1 })
                                            .map((item, index) => (
                                                <option key={index} value={item['ModuleId']}>{item['ModuleName']}</option>
                                            ))}
                                    </select>
                                    <label className="input-label">Module</label>
                                </div>
                            </div>
                            <div className="input-wrapper marginLeft-0" style={{ width: '30%' }}>
                                <div className="input-holder">
                                    <select className="input-input" name="Task" >
                                        {Tasks.map((item, index) => (
                                            <option key={index} value={item['TaskId']}>{item['TaskName']}</option>
                                        ))}
                                    </select>
                                    <label className="input-label">Task</label>
                                </div>
                            </div>

                            <div className="input-wrapper marginLeft-0" style={{ width: '40%' }}>
                                <div className="input-holder">
                                    <select className="input-input" name="Status" >
                                        {Status.map((item, index) => (
                                            <option key={index} value={item['TypeOptionID']}>{item['TypeName']}</option>
                                        ))}
                                    </select>
                                    <label className="input-label">Status</label>
                                </div>
                            </div>
                            <div className="input-wrapper marginLeft-0" style={{ width: '30%' }}>
                                <div className="input-holder">
                                    <input type="text" className="input-input" name="Issues" />
                                    <label className="input-label">Issue</label>
                                </div>
                            </div>
                            <div className="input-wrapper marginLeft-0" style={{ width: '20%' }}>
                                <div className="input-holder">
                                    <input type="text" className="input-input" name="Hours" />
                                    <label className="input-label">Hours</label>
                                </div>
                            </div>
                        </div>


                        <div style={{ width: '35%' }}>
                            <div className="input-wrapper marginLeft-0" style={{ width: '100%' }} >
                                <div className="input-holder">
                                    <textarea type="text" className="input-input" name="TaskDescription" style={{ height: '155px' }} />
                                    <label className="input-label">Task Description</label>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <button className="btn" style={{ margin: '0' }} >Apply</button>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <div style={{ width: '95%', border: '1px solid' + localStorage['BgColor'], borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }}>
                <Accordion expanded="false" onChange={handleChange(-1)}>
                    <AccordionSummary style={{ color: localStorage['Color'], backgroundColor: localStorage['BgColor'], }}>
                        <Typography component={"span"} sx={{ width: '10%', flexShrink: 0 }}>
                            Project
                        </Typography>
                        <Typography component={"span"} sx={{ width: '12%', flexShrink: 0 }}>
                            Module
                        </Typography>
                        <Typography component={"span"} sx={{ width: '12%', flexShrink: 0 }}>
                            Task
                        </Typography>
                        <Typography component={"span"} sx={{ width: '28%', flexShrink: 0 }}>
                            Task Description
                        </Typography>
                        <Typography component={"span"} sx={{ width: '16%', flexShrink: 0 }}>
                            Status
                        </Typography>
                        <Typography component={"span"} sx={{ width: '16%', flexShrink: 0 }}>
                            Hours
                        </Typography>
                    </AccordionSummary>

                </Accordion>

                {Details.map((column, index) => (
                    <Accordion key={index} expanded={expanded === index} className={expanded === index ? 'activeAcc' : ''} onChange={column['LeaveType'] === 'Total' ? handleChange(-1) : handleChange(index)} >
                        <AccordionSummary className={expanded === index ? 'activeAccSum' : ''}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography component={"span"} sx={{ width: '7%', flexShrink: 0 }}>
                                {column['ProjectName']}
                            </Typography>
                            <Typography component={"span"} sx={{ width: '12%', flexShrink: 0, padding: '0 30px' }}>
                                {column['ModuleName']}
                            </Typography>
                            <Typography component={"span"} sx={{ width: '12%', flexShrink: 0, padding: '0 30px' }}>
                                {column['TaskName']}
                            </Typography>
                            <Typography component={"span"} sx={{ width: '30%', flexShrink: 0, padding: '0 30px' }}>
                                {column['TaskDescription']}
                            </Typography>
                            <Typography component={"span"} sx={{ width: '16%', flexShrink: 0, padding: '0 30px' }}>
                                {column['Status']}
                            </Typography>
                            <Typography component={"span"} sx={{ width: '16%', flexShrink: 0, padding: '0 30px' }}>
                                {column['Hours']}
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
        </>
    );
}