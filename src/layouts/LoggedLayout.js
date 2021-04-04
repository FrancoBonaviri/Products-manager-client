import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import LeftMenu from '../components/menu/LeftMenu';
import { Routes } from '../components/router/routes';
import { Topbar } from '../components/topbar/Topbar';


export const LoggedLayout = () => {




    return (
        <Router>
            <div id="main-wrapper">

                <div>
                   <Topbar />
                </div>


                <div>
                    <LeftMenu />
                </div>

                <div className="page-wrapper" >
                    <div className="container-fluid">
                        
                        <div className="row m-2">
                            <Routes/>
                        </div>
                    
                    </div>
                </div>
            </div>
                
                
        </Router>
    );
}
