import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import LeftMenu from '../components/menu/LeftMenu';
import { Routes } from '../components/router/routes';
import { Topbar } from '../components/topbar/Topbar';
import { Modal } from '../components/modal/Modal';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../actions/uiActions';
import './LoggedLayout.css'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

export const LoggedLayout = () => {
    const classes = useStyles();


    const { AlertType, AlertText, AlertOpen } = useSelector(state => state.ui)

    const dispatch = useDispatch();

    useEffect(() => {
        if( AlertOpen ) {

            setTimeout( () => {
                dispatch( closeAlert() );
            }, 5000 );
        
        }
    }, [ AlertOpen ])




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
                    {
                        AlertOpen &&
                        <div className={ classes.root }>
                            <Alert severity={ AlertType } onClose={ () => dispatch( closeAlert() )}> { AlertText } </Alert>
                        </div>
                    }

                    <div className="container-fluid">
                        
                        <div className="row m-2">
                            <Routes/>
                        </div>
                    
                    </div>
                </div>

                <Modal/>
                
            </div>
                
                
        </Router>
    );
}
