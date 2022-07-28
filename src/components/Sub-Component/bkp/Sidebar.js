import React, { useState, useEffect, } from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHome, faLevelUpAlt, faTableList, faTasks, faUser, faUserDoctor, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";


const Sidebar = () => {
    const handelLogOut = () => {
        localStorage.clear();
    }
    const { pathname } = useLocation();
    return (
        <div style={{ display: 'flex', marginTop: '-60px' }}>
            <CDBSidebar backgroundColor={localStorage['BgColor']} textColor={localStorage['Color']} toggled >

                <CDBSidebarHeader style={{ padding: '6px 0' }} prefix={<FontAwesomeIcon icon={faBars} />}>
                    <a className="text-decoration-none" style={{ color: 'inherit', padding: 'inherit' }}>
                        {localStorage['Name']}
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink to="/Home" activeclassname="activeClicked" >
                            <CDBSidebarMenuItem active={pathname === '/Home' ? true : false} suffix={<FontAwesomeIcon icon={faHome} />}>Home</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/EnterTimeSheet" activeclassname="activeClicked">
                            <CDBSidebarMenuItem active={pathname === '/EnterTimeSheet' ? true : false} suffix={<FontAwesomeIcon icon={faTableList} />}>Time Sheet</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/LMS" activeclassname="activeClicked">
                            <CDBSidebarMenuItem active={pathname === '/Tasks' ? true : false} suffix={<FontAwesomeIcon icon={faTasks} />}>Tasks</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/LMS" activeclassname="activeClicked">
                            <CDBSidebarMenuItem active={pathname === '/LMS' ? true : false} suffix={<FontAwesomeIcon icon={faLevelUpAlt} />}>LMS</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/Home" activeclassname="activeClicked">
                            <CDBSidebarMenuItem active={pathname === '/EmployeePortal' ? true : false} suffix={<FontAwesomeIcon icon={faUserDoctor} />}>Employee Portal</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/Profile" activeclassname="activeClicked">
                            <CDBSidebarMenuItem active={pathname === '/Profile' ? true : false} suffix={<FontAwesomeIcon icon={faUser} />}>Profile</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/" onClick={handelLogOut} activeclassname="activeClicked">
                            <CDBSidebarMenuItem suffix={<FontAwesomeIcon icon={faRightFromBracket} />}>Log Out</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        --------
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div >
    );
};

export default Sidebar;