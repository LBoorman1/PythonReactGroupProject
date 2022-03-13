import React, { useState } from 'react';
import { NavLink, Link, Redirect, withRouter } from 'react-router-dom';
import { FiAlignRight, FiXCircle, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { unsetCurrentUser } from "../LoginComponents/LoginActions.js";

const Navbarmenu = props => {
    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
        setisMenu(isMenu === false ? true : false);
        setResponsiveclose(isResponsiveclose === false ? true : false);
    };

    const user = JSON.parse(localStorage.getItem('user'))
    const mentee = user.is_mentee
    const mentor = user.is_mentor
    const admin = user.is_admin

    let boxClass = ["main-menu menu-right menuq1"];
    if (isMenu) {
        boxClass.push('menuq2');
    }

    else {
        boxClass.push('');
    }

    const [isMenuSubMenuMentee, setMenuSubMenuMentee] = useState(false);

    const toggleSubmenuMentee = () => {
        setMenuSubMenuMentee(isMenuSubMenuMentee === false ? true : false);
    };

    let boxClassSubMenuMentee = ["sub__menus"];
    if (isMenuSubMenuMentee) {
        boxClassSubMenuMentee.push('sub__menus__Active');
    }

    else {
        boxClassSubMenuMentee.push('');
    }

    const [isMenuSubMenuMentor, setMenuSubMenuMentor] = useState(false);

    const toggleSubmenuMentor = () => {
        setMenuSubMenuMentor(isMenuSubMenuMentor === false ? true : false);
    };


    let boxClassSubMenuMentor = ["sub__menus"];
    if (isMenuSubMenuMentor) {
        boxClassSubMenuMentor.push('sub__menus__Active');
    }

    else {
        boxClassSubMenuMentor.push('');
    }

    const handle_logout = e => {
        e.preventDefault();
        const user_data = JSON.parse(localStorage.getItem("user"));
        unsetCurrentUser();
        axios
            .post("http://localhost:8000/logout/", user_data)
            .then(response => {
                console.log(response);
                props.history.push('/Signin');
                window.location.reload();
                //unsetCurrentUser();
                //if (localStorage.getItem('token') == null) {
                    //return <Redirect to='/Signin' push />
                //}
            });
    };

    return (
        <header className="header__middle">
            <div className="container">
                <div className="row">
                    <div className="header__middle__menus">
                        <nav className="main-nav " >
                            {/* Responsive Menu Button */}
                            {isResponsiveclose === true ? <>
                                <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiXCircle />   </span>
                            </> : <>
                                <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiAlignRight />   </span>
                            </>}
                            <ul className={boxClass.join(' ')}>
                                <li className="menu-item" >
                                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/MyDetails`}>View My Details</NavLink>
                                </li>
                                <li className="menu-item" >
                                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/EditDetails`}>Edit My Details</NavLink>
                                </li>
                                <li className="menu-item" >
                                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/Calendar`}>My Calendar</NavLink>
                                </li>

                                <li className="menu-item" >
                                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/GiveFeedback`}>Give Feedback</NavLink>
                                </li>
                                <li className="menu-item" >
                                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/MyFeedback`}>My Feedback</NavLink>
                                </li>
                                {mentee && <li onClick={toggleSubmenuMentee} className="menu-item sub__menus__arrows" > <Link to="#"> Mentee <FiChevronDown /> </Link>
                                    <ul className={boxClassSubMenuMentee.join(' ')} >
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/DisplayMyMentor`}>Display or Find Mentor</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/BookMentoringMeeting`}>Book Mentoring Meeting</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/CreatePOAMentee`}> Create POA</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/MyPOAMentee`}>My POAs</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/JoinGroupMeeting`}>Join Group meetings</NavLink></li>
                                    </ul>
                                </li>}
                                {mentor && <li onClick={toggleSubmenuMentor} className="menu-item sub__menus__arrows" > <Link to="#"> Mentor <FiChevronDown /> </Link>
                                    <ul className={boxClassSubMenuMentor.join(' ')} >
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/DisplayMyMentees`}>Display My Mentees</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/MentorRequestRespond`}>Mentor Requests </NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/AddFreeHours`}>Add Free Hours </NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/CreatePOAMentor`}>Create POA for Mentee</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/MyPOAMentor`}>My Mentees' POAs</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/OrganiseGroupSession`}> Organise Group Session </NavLink> </li>
                                    </ul>
                                </li>}
                                {admin && <li onClick={toggleSubmenuMentor} className="menu-item sub__menus__arrows" > <Link to="#"> Admin <FiChevronDown /> </Link>
                                    <ul className={boxClassSubMenuMentor.join(' ')} >
                                        <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/ToggleAdmin`}>Toggle Admin</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/ToggleActive`}>Toggle User Active</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/EditBusinessAreasTopics`}>Edit Business Areas and Topics</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/ViewAllApplicationFeedback`}>View All Application Feedback</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/BecomeMentorRequests`}>Become Mentor Requests</NavLink> </li>
                                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/BusinessAreaChangeRequests`}>Business Area Change Requests</NavLink> </li>
                                    </ul>
                                </li>}
                                <li className="logout_button menu-item " >
                                    <NavLink exact activeClassName='is-active' onClick={handle_logout} to={`/Signin`}> Logout </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default withRouter(Navbarmenu);
