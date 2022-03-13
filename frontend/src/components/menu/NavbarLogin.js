import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiAlignRight, FiXCircle } from "react-icons/fi";

const NavbarLogin = () => {
    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
        setisMenu(isMenu === false ? true : false);
        setResponsiveclose(isResponsiveclose === false ? true : false);
    };

    let boxClass = ["main-menu menu-right menuq1"];
    if (isMenu) {
        boxClass.push('menuq2');
    }

    else {
        boxClass.push('');
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
                                <li className="menu-item " >
                                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/Signin`}> Sign in </NavLink>
                                </li>

                                <li className="menu-item " >
                                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/CreateAccount`}> Create Account </NavLink>
                                </li>
                                <li className="menu-item " >
                                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/MyDetails`}> Submit </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavbarLogin;
