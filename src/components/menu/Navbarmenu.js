import React,{useState} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {FiAlignRight,FiXCircle,FiChevronDown } from "react-icons/fi";
const Navbarmenu = () => {
    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
      setisMenu(isMenu === false ? true : false);
      setResponsiveclose(isResponsiveclose === false ? true : false);
  };

    let boxClass = ["main-menu menu-right menuq1"];
    if(isMenu) {
        boxClass.push('menuq2');
    }

    else{
        boxClass.push('');
    }


    const [isMenuSubMenuMentee, setMenuSubMenuMentee] = useState(false);

    const toggleSubmenuMentee = () => {
      setMenuSubMenuMentee(isMenuSubMenuMentee === false ? true : false);
    };


    let boxClassSubMenuMentee = ["sub__menus"];
    if(isMenuSubMenuMentee) {
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
    if(isMenuSubMenuMentor) {
        boxClassSubMenuMentor.push('sub__menus__Active');
    }

    else {
        boxClassSubMenuMentor.push('');
    }

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
                    <li  className="menu-item" >
                        <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/MyDetails`}> My Details</NavLink>
                    </li>

                    <li  className="menu-item" >
                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/GiveFeedback`}> Give Feedback </NavLink>
                    </li>
                    <li  className="menu-item" >
                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/MyFeedback`}> My Feedback </NavLink>
                    </li>
                    <li  className="menu-item" >
                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/EditDetails`}> Edit Details </NavLink>
                    </li>
                    <li onClick={toggleSubmenuMentee} className="menu-item sub__menus__arrows" > <Link to="#"> Mentee <FiChevronDown /> </Link>
                        <ul className={boxClassSubMenuMentee.join(' ')} >
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/BookMentoringMeeting`}> Book Mentoring Meeting </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/CreatePOAMentee`}> Create POA Mentee </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/DisplayMyMentor`}> Display My Mentor </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/MyPOAMentee`}> My POA Mentee </NavLink> </li>
                        </ul>
                    </li>
                    <li onClick={toggleSubmenuMentor} className="menu-item sub__menus__arrows" > <Link to="#"> Mentor <FiChevronDown /> </Link>
                        <ul className={boxClassSubMenuMentor.join(' ')} >
                            <li><NavLink onClick={toggleClass} activeClassName='is-active'  to={`/DisplayMyMentee`}> Display My Mentee </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/SetFreeHours`}>Set Free Hours </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/CreatePOAMentor`}> Create POA Mentor </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/MyPOAMentor`}> My POA Mentor </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/OrganiseGroupSession`}> Organise Group Session </NavLink> </li>
                        </ul>
                    </li>
                    <li onClick={toggleSubmenuMentor} className="menu-item sub__menus__arrows" > <Link to="#"> Admin <FiChevronDown /> </Link>
                        <ul className={boxClassSubMenuMentor.join(' ')} >
                            <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/AddAdmin`}> Add Admin </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/RemoveUser`}> Remove User </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/ChangeTopics`}> Change Topics </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/SetSessionThreshold`}> Set Session Threshold </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/ViewFeedback`}> ViewFeedback </NavLink> </li>
                        </ul>
                    </li>
                    <li  className="logout_button menu-item " >
                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/Signin`}> Logout </NavLink>
                    </li>
                    <li  className="create_account_button menu-item " >
                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/CreateAccount`}> Create Account </NavLink>
                    </li>
                    </ul>


                    </nav>
                </div>

            </div>
	    </div>
    </header>
    )
}

export default Navbarmenu
