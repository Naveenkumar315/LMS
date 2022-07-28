import React, { useState, useEffect, } from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHome, faHouseChimney, faArrowRight, faLevelUpAlt, faTableList, faTasks, faUser, faUserDoctor, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import '../css/Sidebar.css'

const Sidebar = (props) => {
    const handelLogOut = () => {
        localStorage.clear();
    }
    const [IsOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    return (
        <div style={{ display: 'flex', marginTop: '-60px' }}>
            <div>
                <nav className={`sidebar ${IsOpen ? 'close' : ''}`}>
                    <header>
                        <div className="image-text">
                            <span className="image">
                                <img src="logo.png" alt="" />
                            </span>
                            <div className="text logo-text">
                                <span className="name">{localStorage['Name']}</span>
                                {/* <span className="profession">Web developer</span> */}
                            </div>
                        </div>
                        {<FontAwesomeIcon className='icon Side-toggle' icon={faBars} onClick={() => { setIsOpen(!IsOpen) }} />}
                    </header>
                    <div className="menu-bar">
                        <div className="menu">

                            <div className="menu-links">
                                <NavLink to="/Home" className={`nav-link tab ${pathname === '/Home' ? 'active' : ''}`} >
                                    <FontAwesomeIcon icon={faHouseChimney} className="icon" />
                                    <span className="text nav-text">Home</span>
                                </NavLink>

                                <NavLink to="/EnterTimeSheet" className={`nav-link tab ${pathname === '/EnterTimeSheet' ? 'active' : ''}`} >
                                    <FontAwesomeIcon icon={faTableList} className="icon" />
                                    <span className="text nav-text">Time Sheet</span>
                                </NavLink>

                                <NavLink to="/LMS" className={`nav-link tab ${pathname === '/LMS' ? 'active' : ''}`} >
                                    <FontAwesomeIcon icon={faTasks} className="icon" />
                                    <span className="text nav-text">Tasks</span>
                                </NavLink>
                                <NavLink to="/LMS" className={`nav-link tab ${pathname === '/LMS' ? 'active' : ''}`} >
                                    <FontAwesomeIcon icon={faLevelUpAlt} className="icon" />
                                    <span className="text nav-text">LMS</span>
                                </NavLink>
                                <NavLink to="/Home" className={`nav-link tab ${pathname === '/Home' ? 'active' : ''}`} >
                                    <FontAwesomeIcon icon={faUserDoctor} className="icon" />
                                    <span className="text nav-text">Employee Portal</span>
                                </NavLink>
                                <NavLink to="/Profile" className={`nav-link tab ${pathname === '/Profile' ? 'active' : ''}`} >
                                    <FontAwesomeIcon icon={faUser} className="icon" />
                                    <span className="text nav-text">Profile</span>
                                </NavLink>
                            </div>
                        </div>
                        <div className="bottom-content">
                            <NavLink to="/" onClick={handelLogOut} className="nav-link tab" >
                                <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                                <span className="text nav-text">Logout</span>
                            </NavLink>
                        </div>
                    </div>
                </nav>
                <section className="body">
                    <div className="text">Dashboard Sidebar</div>
                </section>
            </div>
        </div >
    );
};

export default Sidebar;