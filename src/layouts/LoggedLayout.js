import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import LeftMenu from '../components/menu/LeftMenu';


export const LoggedLayout = () => {
    return (
        <Router>
            <div id="main-wrapper">

                <div>
                    <header className="topbar">
                        <nav className="navbar top-navbar navbar-expand-md navbar-light">

                            <h2>TOPBAR</h2>
                        </nav>
                    </header>
                </div>


                <div>
                    <LeftMenu />
                </div>

                <div className="page-wrapper" >
                    <div className="container-fluid r-aside">
                        
                        <div className="row">
                        </div>

                        <div className="row p-5">
                            <h2>Container</h2>
                        </div>
                    </div>
                </div>
            </div>
                
                
        </Router>
    );
}
