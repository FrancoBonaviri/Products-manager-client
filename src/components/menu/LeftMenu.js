import React, { useEffect, useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import noAvatar from '../../assets/images/no-avatar.png'

// import './LeftMenu.css'


const LeftMenu = (props) => {
    const { user, location } = props;



    const [activeMenu, setActiveMenu] = useState(location.pathname);


    useEffect(() => {
        setActiveMenu( location.pathname )
    }, [location])


    return (
        <aside className="left-sidebar">
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        <li className="user-profile">
                            <a className="has-arrow waves-effect waves-dark" aria-expanded="false">
                                <img src={ noAvatar } alt="user" />
                                <span className="hide-menu">Steave Jobs </span>
                            </a>
                            <ul aria-expanded="false" className="collapse">
                                <li><a href="#">My Profile </a></li>
                                <li><a href="#">My Balance</a></li>
                                <li><a href="#">Inbox</a></li>
                                <li><a href="#">Account Setting</a></li>
                                <li><a href="#">Logout</a></li>
                            </ul>
                        </li>
                        <li className="nav-devider"></li>
                        <li>
                            <a className="has-arrow waves-effect waves-dark" aria-expanded="false">
                            <i className="fas fa-boxes"></i>
                                <span className="hide-menu"> Productos <span className="label label-rouded label-themecolor pull-right">4</span></span>
                            </a>
                            <ul aria-expanded="false" className="collapse">
                                <li><a href="index.html">Minimal </a></li>
                                <li><a href="index2.html">Analytical</a></li>
                                <li><a href="index3.html">Demographical</a></li>
                                <li><a href="index4.html">Modern</a></li>
                            </ul>
                        </li>
                        <li> <a className="has-arrow waves-effect waves-dark" aria-expanded="false">
                        <i className="fas fa-truck"></i><span className="hide-menu"> Compras</span></a>
                            <ul aria-expanded="false" className="collapse">
                                <li><a href="app-calendar.html">Calendar</a></li>
                                <li><a href="app-chat.html">Chat app</a></li>
                            </ul>
                        </li>
                        <li> <a className="has-arrow waves-effect waves-dark" aria-expanded="false"><i className="fas fa-money-bill"></i><span className="hide-menu"> Ventas</span></a>
                            <ul aria-expanded="false" className="collapse">
                                <li><a href="app-calendar.html">Calendar</a></li>
                                <li><a href="app-chat.html">Chat app</a></li>
                                <li><a href="app-ticket.html">Support Ticket</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}
export default withRouter(LeftMenu);