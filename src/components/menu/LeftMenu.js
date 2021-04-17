import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';

import noAvatar from '../../assets/images/no-avatar.png'

// import './LeftMenu.css'


const LeftMenu = (props) => {
    const { location } = props;


    const handlogout = () => {
        console.log('logout');
    }

    
    
    useEffect(() => {
        setActiveMenu( location.pathname )
    }, [location])
    
    
    const [activeMenu, setActiveMenu] = useState(location.pathname);



    const isInSubMenu = (menu) => {
        switch ( menu ){
            
            case 'Productos' : 
                return (activeMenu === '/new-product' || activeMenu === '/list-product')
            case 'Compras' : 
                return (activeMenu === '/new-compra' || activeMenu === '/list-compras-pendientes' || activeMenu === '/compras-historicas' )
            case 'Ventas' : 
                return ( activeMenu === '/new-venta' || activeMenu === '/ventas-pendientes' || activeMenu === '/solicitudes-venta' || activeMenu === '/ventas-historicas' ) 
            case 'Profile' : 
                return ( activeMenu === '/profile' || activeMenu === '/settings') 
            case 'Categorias': 
                return ( activeMenu === '/new-categoria' || activeMenu === '/list-categoria' )
            case 'Solicitante': 
                return ( activeMenu === '/new-solicitante' || activeMenu === '/list-solicitante' )
            default:
                return false;
        }
    } 

    return (
        <aside className="left-sidebar">
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        <li  className={ isInSubMenu('Profile') ? ' user-profile active' : 'user-profile' }>
                            <a href="#" className="has-arrow waves-effect waves-dark" aria-expanded="false">
                                <img src={ noAvatar } alt="user" />
                                <span className="hide-menu">Steave Jobs </span>
                            </a>
                            <ul aria-expanded="false" className="collapse">
                                <li><Link  className={activeMenu === '/profile' ? 'active' : ''} to="/profile">My Profile </Link></li>
                                <li><Link  className={activeMenu === '/settings' ? 'active' : ''} to="/settings">Account Setting</Link></li>
                                <li><a href="#" style={{ cursor: 'pointer' }} onClick={ handlogout }  >Logout</a></li>
                            </ul>
                        </li>
                        <li className="nav-devider"></li>
                        <li className={ isInSubMenu('Productos') ? 'active' : '' }>
                            <a href="#" className="has-arrow waves-effect waves-dark" aria-expanded="false"> 
                            <i className="fas fa-boxes"></i>
                                <span className="hide-menu"> Productos </span>
                            </a>
                            <ul aria-expanded="false" className="collapse">
                                <li><Link className={activeMenu === '/new-product' ? 'active' : ''} to="/new-product">Nuevo Producto </Link></li>
                                <li><Link className={activeMenu === '/list-product' ? 'active' : ''} to="/list-product">Listado</Link></li>
                            </ul>
                        </li>
                        <li className={ isInSubMenu('Categorias') ? 'active' : '' }>
                            <a href="#" className="has-arrow waves-effect waves-dark" aria-expanded="false"> 
                            <i className="fas fa-object-group"></i>
                                <span className="hide-menu"> Categorias </span>
                            </a>
                            <ul aria-expanded="false" className="collapse">
                                <li><Link className={activeMenu === '/new-categoria' ? 'active' : ''} to="/new-categoria">Nueva categoria </Link></li>
                                <li><Link className={activeMenu === '/list-categoria' ? 'active' : ''} to="/list-categoria">Listado</Link></li>
                            </ul>
                        </li>
                        <li className={ isInSubMenu('Compras') ? 'active' : '' }> 
                            <a href="#" className="has-arrow waves-effect waves-dark" aria-expanded="false">
                            <i className="fas fa-truck"></i><span className="hide-menu"> Compras</span></a>
                            <ul aria-expanded="false" className="collapse">
                                <li><Link  className={activeMenu === '/new-compra' ? 'active' : ''} to="/new-compra">Nueva Compra</Link></li>
                                <li><Link  className={activeMenu === '/list-compras-pendientes' ? 'active' : ''} to="/list-compras-pendientes">Compras pendientes</Link></li>
                                <li><Link  className={activeMenu === '/compras-historicas' ? 'active' : ''} to="/compras-historicas">Compras historicas</Link></li>

                            </ul>
                        </li>
                        <li className={ isInSubMenu('Ventas') ? 'active' : '' }> 
                            <a href="#" className="has-arrow waves-effect waves-dark" aria-expanded="false"><i className="fas fa-cash-register"></i><span className="hide-menu"> Ventas</span></a>
                            <ul aria-expanded="false" className="collapse">
                                <li><Link  className={activeMenu === '/new-venta' ? 'active' : ''} to="/new-venta">Nueva venta</Link></li>
                                <li><Link  className={activeMenu === '/ventas-pendientes' ? 'active' : ''} to="/ventas-pendientes">Ventas pendientes</Link></li>
                                <li><Link  className={activeMenu === '/solicitudes-venta' ? 'active' : ''} to="/solicitudes-venta">Solicitudes</Link></li>
                                <li><Link  className={activeMenu === '/ventas-historicas' ? 'active' : ''} to="/ventas-historicas">Ventas Historicas</Link></li>
                            </ul>
                        </li>
                        <li className={ isInSubMenu('Solicitante') ? 'active' : '' }> 
                            <a href="#" className="has-arrow waves-effect waves-dark" aria-expanded="false"><i className="fas fa-user"></i><span className="hide-menu"> Solicitantes</span></a>
                            <ul aria-expanded="false" className="collapse">
                                <li><Link  className={activeMenu === '/new-solicitante' ? 'active' : ''} to="/new-solicitante">Nuevo solicitante</Link></li>
                                <li><Link  className={activeMenu === '/list-solicitante' ? 'active' : ''} to="/list-solicitante">Listado de solicitantes</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}
export default withRouter(LeftMenu);