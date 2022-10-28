import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nodeurl from '../../../nodeServer.json'
import { useAlert } from "react-alert";
import DatePicker from '../../Sub-Component/DatePicker/DatePicker';

export default function TaskAssignment() {

    const alert = useAlert();
    const [Client, setClient] = useState([]);
    const [TaskPriority, setTaskPriority] = useState([]);

    useEffect(() => {
        axios.post(nodeurl['nodeurl'], { query: 'AB_GetClientId ' }).then(result => {
            setClient(result.data[0]);
        });
        axios.post(nodeurl['nodeurl'], { query: 'AB_Priority ' }).then(result => {
            setTaskPriority(result.data[0]);
        });
    }, []);

    const SelectDD = (props) => {
        return (
            <div className="input-wrapper marginLeft-0" style={props['style'] || { width: '100%' }}>
                <div className="input-holder">
                    <select className="input-input" name={props['name']} value={props['value']} onChange={props['OnChange']}>
                        <option key="-1" value="-1">--Select--</option>
                        {props['option'].map((item, index) => (
                            <option key={index} value={item['value']}>{item['text']}</option>
                        ))}
                    </select>
                    <label className="input-label">{props['label']}</label>
                </div>
            </div>
        );
    }
    const InputBox = (props) => {

        return (
            <div className="input-wrapper marginLeft-0  marginRight-0" style={{ width: '100%' }}>
                <div className="input-holder">
                    <input type="text" placeholder={props['placeholder']} className="input-input" name={props['name']} value={props['value']} onChange={props['onChange']} />
                    <label className="input-label">{props['label']}</label>
                </div>
            </div>
        );
    }
    const Button = (props) => {
        return (
            <>
                <button className="btn marginLeft-0" style={{ float: 'right' }} {...props['disabled']()} onClick={props['onClick']}>{props['text']}</button>
            </>
        );
    }
    const AddClient = (props) => {
        const [ClientDetails, setClientDetails] = useState({ ClientName: '', ClientCode: '' });
        const handelClientOnChange = (e) => {
            setClientDetails({ ...ClientDetails, [e.target.name]: e.target.value });
        }
        const isClientDisable = () => {
            let isValidate = false;
            if (ClientDetails['ClientName'] === '' || ClientDetails['ClientCode'] === '')
                isValidate = true;

            return { disabled: isValidate };
        }
        const handelClientClick = () => {
            axios.post(nodeurl['nodeurl'], { query: 'AB_AddNewClientlist ' + ClientDetails['ClientName'] + ',' + ClientDetails['ClientCode'] }).then(result => {
                setClientDetails({ ...ClientDetails, ClientName: '', ClientCode: '' });
                let value = result.data[0][0]['Result'];
                if (value === 1)
                    alert.show("Client Name already exist!!!");
                else
                    alert.success("New Client Added successfully.");
                axios.post(nodeurl['nodeurl'], { query: 'AB_GetClientId ' }).then(result => {
                    setClient(result.data[0]);
                });
            });
        }
        return (
            <>
                <div className='task-container' style={props['style']} >
                    <h1>Add Client</h1>
                    <InputBox name="ClientName" value={ClientDetails['ClientName']} placeholder="Client Name" onChange={handelClientOnChange} label="Client Name" />
                    <InputBox name="ClientCode" value={ClientDetails['ClientCode']} placeholder="Client Code" onChange={handelClientOnChange} label="Client Code" />
                    <Button disabled={isClientDisable} onClick={handelClientClick} text="Add Client" />
                </div>
            </>
        );
    }
    const AddProject = (props) => {
        const [NewProjectDetails, setNewProjectDetails] = useState({ ClientID: '-1', ProjectName: '' });
        const isProjectDisable = () => {
            let isValidate = false;
            if (NewProjectDetails['ClientID'] === '-1' || NewProjectDetails['ProjectName'] === '')
                isValidate = true;

            return { disabled: isValidate };
        }
        const handelProjectChange = (e) => {
            setNewProjectDetails({ ...NewProjectDetails, [e.target.name]: e.target.value });
        }
        const handelProjectClick = () => {
            axios.post(nodeurl['nodeurl'], { query: 'AB_AddNewProjectList ' + NewProjectDetails['ProjectName'] + ',' + NewProjectDetails['ClientID'] }).then(result => {
                let value = result.data[0][0]['Result'];
                setNewProjectDetails({ ...NewProjectDetails, ClientID: '-1', ProjectName: '' });
                if (value === 1)
                    alert.show("Project already exist!!!");
                else
                    alert.success("New Project Added successfully.");
            });
        }
        return (<>
            <div className='task-container' style={props['style']}>
                <h1>Add Project</h1>
                <SelectDD name="ClientID" label="Client" option={Client} value={NewProjectDetails['ClientID']} OnChange={handelProjectChange} />
                <InputBox name="ProjectName" onChange={handelProjectChange} placeholder="Project Name" value={NewProjectDetails['ProjectName']} label="Project Name" />
                <Button disabled={isProjectDisable} onClick={handelProjectClick} text="Add Project" />
            </div>
        </>);
    }
    const AddModule = (props) => {
        const [Project, setProject] = useState([]);
        const [NewModuleDetails, setNewModuleDetails] = useState({ ClientID: '-1', ProjectID: '-1', ModuleName: '' });
        const handelModuleChange = (e) => {
            setNewModuleDetails({ ...NewModuleDetails, [e.target.name]: e.target.value });
            if (e.target.name === 'ClientID') {
                axios.post(nodeurl['nodeurl'], { query: 'AB_ProjectddList ' + e.target.value }).then(result => {
                    setProject(result.data[0]);
                });
            }
        }
        const isModuleDisable = () => {
            let isValidate = false;
            if (NewModuleDetails['ClientID'] === '-1' || NewModuleDetails['ProjectID'] === '-1' || NewModuleDetails['ModuleName'] === '')
                isValidate = true;

            return { disabled: isValidate };
        }
        const handelModuleClick = () => {
            axios.post(nodeurl['nodeurl'], { query: 'AB_AddNewModuleList ' + NewModuleDetails['ModuleName'] + ',' + NewModuleDetails['ProjectID'] }).then(result => {
                setNewModuleDetails({ ...NewModuleDetails, ClientID: '-1', ProjectID: '-1', ModuleName: '' });
                let value = result.data[0][0]['Result'];
                if (value === 1)
                    alert.show("Module already exist!!!");
                else
                    alert.success("New Module Added successfully.");
            });
        }
        return (<>
            <div className='task-container' style={props['style']}>
                <h1>Add Module</h1>
                <div style={{ display: 'inline-flex' }}>
                    <SelectDD name="ClientID" style={{ width: '48%', display: 'inline-block', marginRight: '15px' }} label="Client" option={Client} value={NewModuleDetails['ClientID']} OnChange={handelModuleChange} />
                    <SelectDD name="ProjectID" style={{ width: '48%', display: 'inline-block', marginRight: 0 }} label="Project" option={Project} value={NewModuleDetails['ProjectID']} OnChange={handelModuleChange} />
                </div>
                <InputBox name="ModuleName" label="Module Name" onChange={handelModuleChange} placeholder="Module Name" value={NewModuleDetails['ModuleName']} />
                <Button disabled={isModuleDisable} onClick={handelModuleClick} text="Add Module" />
            </div></>);
    }

    const AddTask = (props) => {
        const [Module, setModule] = useState([]);
        const [Project, setProject] = useState([]);
        const [NewTaskDetails, setNewTaskDetails] = useState({ ClientID: '-1', ProjectID: '-1', ModuleID: '-1', TaskName: '', TaskDescription: '', TaskPriority: '-1', StartDate: new Date(), EndDate: new Date() });
        const handelTaskOnChange = (e) => {
            setNewTaskDetails({ ...NewTaskDetails, [e.target.name]: e.target.value });
            if (e.target.name === 'ClientID') {
                axios.post(nodeurl['nodeurl'], { query: 'AB_ProjectddList ' + e.target.value }).then(result => {
                    setProject(result.data[0]);
                });
            }
            if (e.target.name === 'ProjectID') {
                axios.post(nodeurl['nodeurl'], { query: 'AB_ModuleList ' + e.target.value }).then(result => {
                    setModule(result.data[0]);
                });
            }

        }
        const isTaskDisable = () => {
            let isValidate = false;
            if (NewTaskDetails['ClientID'] === '-1' || NewTaskDetails['ProjectID'] === '-1' || NewTaskDetails['ModuleID'] === '-1'
                || NewTaskDetails['TaskName'] === '' || NewTaskDetails['TaskDescription'] === '' || NewTaskDetails['TaskPriority'] === '-1')
                isValidate = true;
            return { disabled: isValidate };
        }
        const handelTaskClick = () => {
            axios.post(nodeurl['nodeurl'] + 'Update', { SP: 'AB_AddNewTaskList ', UpdateJson: JSON.stringify(NewTaskDetails) }).then(result => {
                setNewTaskDetails({ ...NewTaskDetails, ClientID: '-1', ProjectID: '-1', ModuleID: '-1', TaskName: '', TaskDescription: '', TaskPriority: '-1', StartDate: new Date(), EndDate: new Date() });
                let value = result.data[0][0]['Result'];
                if (value === 1)
                    alert.show("Task already exist!!!");
                else
                    alert.success("New Task Added successfully.");
            });

        }
        return (<>
            <div className='task-container' style={props['style']}>
                <h1>Add Task</h1>
                <SelectDD name="ClientID" style={{ width: '150px', marginRight: '15px' }} label="Client" option={Client} value={NewTaskDetails['ClientID']} OnChange={handelTaskOnChange} />
                <SelectDD name="ProjectID" style={{ width: '195px', display: 'inline-block', marginRight: '15px' }} label="Project" option={Project} value={NewTaskDetails['ProjectID']} OnChange={handelTaskOnChange} />
                <SelectDD name="ModuleID" label="Module" option={Module} value={NewTaskDetails['ModuleID']} OnChange={handelTaskOnChange} />
                <InputBox name="TaskName" label="Task Name" onChange={handelTaskOnChange} placeholder="Task Name" value={NewTaskDetails['TaskName']} />
                <div className="input-wrapper marginLeft-0" style={{ width: '100%' }}>
                    <div className="input-holder">
                        <textarea className="input-input textarea" name="TaskDescription" placeholder="Enter Task Description" value={NewTaskDetails['TaskDescription']} onChange={handelTaskOnChange} />
                        <label className="input-label">Task Description</label>
                    </div>
                </div>
                <SelectDD name="TaskPriority" label="Task Priority" option={TaskPriority} value={NewTaskDetails['TaskPriority']} OnChange={handelTaskOnChange} />
                <div className="input-wrapper marginLeft-0" style={{ width: '170px', marginRight: '15px' }}>
                    <div className="input-holder  input-DatePicker" >
                        <DatePicker name="PlannedStartDate" Value={(NewTaskDetails['StartDate'])} valueChange={handelTaskOnChange} />
                        <label className="input-label">Planned Start Date</label>
                    </div>
                </div>
                <div className="input-wrapper marginLeft-0" style={{ width: '170px', marginRight: '15px' }}>
                    <div className="input-holder  input-DatePicker" >
                        <DatePicker name="EndDate" Value={(NewTaskDetails['EndDate'])} valueChange={handelTaskOnChange} />
                        <label className="input-label">Planned End Date</label>
                    </div>
                </div>
                <div>
                    <Button disabled={isTaskDisable} onClick={handelTaskClick} text="Add Task" />
                </div>
            </div>
        </>);
    }
    return (<div >
        <AddClient style={{ width: '30%', display: 'inline-grid' }} />
        <AddProject style={{ width: '30%', display: 'inline-grid' }} />
        <AddModule style={{ width: '30%', display: 'inline-grid' }} />
        <AddTask style={{ display: 'flow-root' }} />
    </div>);
}