import React from 'react'
import { Link } from 'react-router-dom'

import noAvatar from '../../assets/images/no-avatar.png'
import logo from '../../assets/images/logo-icon.png'

export const Topbar = () => {



    const handleLogout = () => {
        console.log('LOGOUT');
    }


    return (
        <header className="topbar">
                <nav className="navbar top-navbar navbar-expand-md navbar-light">

                <div className="navbar">
                    <a className="navbar-brand" href="/">
                        <b>
                            <img src={logo} alt="" style={{ height: '50px', width:'150px'}} className="dark-logo" />
                        </b>
                    </a>
                </div>

                <div className="navbar-collapse">

                    <ul className="navbar-nav mr-auto" style={{ marginLeft: '-45px'}}>
                        <li className="nav-item"> <a className="nav-link nav-toggler hidden-md-up waves-effect waves-dark" href="#"><i className="fas fa-bars"></i></a> </li>
                        <li className="nav-item"> <a className="nav-link sidebartoggler hidden-sm-down waves-effect waves-dark" href="#"><i className="fas fa-bars"></i></a> </li>
                        
                    </ul>

                    <ul className="navbar-nav my-lg-0">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={noAvatar}  className="profile-pic" /></a>
                            <div className="dropdown-menu dropdown-menu-right animated flipInY">
                                <ul className="dropdown-user">
                                    <li>
                                        <div className="dw-user-box">
                                            <div className="u-img"><img src={ noAvatar }  /></div>
                                            <div className="u-text">
                                                <h4>Steave Jobs</h4>
                                                <p className="text-muted">varun@gmail.com</p><Link to="/profile" className="btn btn-rounded btn-danger btn-sm">View Profile</Link></div>
                                        </div>
                                    </li>
                                    <li role="separator" className="divider"></li>
                                    <li><Link to="/profile"><i className="ti-user"></i> My Profile</Link></li>
                                    <li role="separator" className="divider"></li>
                                    <li><Link to="/settings"><i className="ti-settings"></i> Account Setting</Link></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a onClick={ handleLogout } style={{ cursor: 'pointer' }} ><i className="fa fa-power-off"></i> Logout</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>













                </nav>
        </header>
    )
}
