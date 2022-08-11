import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHouseChimney, faLevelUpAlt, faTableList, faTasks, faUser, faUserDoctor, sett, faRightFromBracket, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import Male from "../../images/Male.png";
import Female from "../../images/Female.png";
import "../css/Sidebar.css";
import ToolTip from "./ToolTip";

const Sidebar = (props) => {
    const handelLogOut = () => {
        localStorage.clear();
    };
    const [IsOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    let images;
    try {
        images = require('../../images/Profile_' + localStorage['EmpId'] + '.png');
    } catch (error) {
        images = localStorage['Gender'] === 'Female' ? Female : Male
    }
    const Tabs = [
        { text: 'Home', link: '/Home', icon: faHouseChimney },
        { text: 'Time Sheet', link: '/EnterTimeSheet', icon: faTableList },
        { text: 'Tasks', link: '/Tasks', icon: faTasks },
        { text: 'LMS', link: '/LMS', icon: faLevelUpAlt },
        { text: 'Employee Portal', link: '/EmployeePortal', icon: faUserDoctor },
        { text: 'Profile', link: '/Profile', icon: faUser },
        { text: 'Settings', link: '/Settings', icon: faUserGear }
    ];
    return (
        <>
            <div className="ABWrapper">
                <h2 className="AB" >Analytic Brains</h2>
            </div>
            <div style={{ marginTop: "-60px" }}>
                <div>
                    <nav className={`sidebar ${IsOpen ? "close" : ""}`}>
                        <header>
                            <div className="image-text">
                                <NavLink to="/Settings" >
                                    <span className="image">
                                        <img src={images} alt="Profile" />
                                    </span>
                                </NavLink>
                                <div className="text logo-text">
                                    <span className="name">{localStorage["Name"]}</span>
                                    <span className="profession">{localStorage["Designation"]}</span>
                                </div>
                            </div>
                            {<FontAwesomeIcon className="icon Side-toggle" icon={faChevronRight} onClick={() => { setIsOpen(!IsOpen); }} />}
                        </header>
                        <div className="menu-bar">
                            <div className="menu">
                                <div className="menu-links">
                                    {Tabs.map((item, index) => {
                                        return (
                                            IsOpen ?
                                                <ToolTip key={index} title={item['text']} placement="left">
                                                    <NavLink to={item['link']} className={`nav-link tab ${pathname === item['link'] ? "active" : ""}`}>
                                                        <FontAwesomeIcon icon={item['icon']} className="icon" />
                                                        <span className="text nav-text">{item['text']}</span>
                                                    </NavLink>
                                                </ToolTip>
                                                :
                                                <NavLink key={index} to={item['link']} className={`nav-link tab ${pathname === item['link'] ? "active" : ""}`}>
                                                    <FontAwesomeIcon icon={item['icon']} className="icon" />
                                                    <span className="text nav-text"> {item['text']}</span>
                                                </NavLink>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="bottom-content">
                                {IsOpen ?
                                    <ToolTip title="Logout" placement="left">
                                        <NavLink to="/" onClick={handelLogOut} className="nav-link tab">
                                            <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                                            <span className="text nav-text">Logout</span>
                                        </NavLink>
                                    </ToolTip>
                                    :
                                    <NavLink to="/" onClick={handelLogOut} className="nav-link tab">
                                        <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                                        <span className="text nav-text">Logout</span>
                                    </NavLink>
                                }
                            </div>
                        </div>
                    </nav>
                    <section className="body">
                        <div className="text">
                            <div className="scrollbar">
                                <div style={{ marginTop: "20px" }}>{props["Component"]}</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
