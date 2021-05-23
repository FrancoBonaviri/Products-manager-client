import React, { useState } from 'react'
import backGround from '../../assets/images/login-register.jpg'
import { login } from '../../services/authService'
import './loginScreen.css'


const inicialStateFormData = {
    email: '',
    password: '',
}


const inicialStateFormErrors = {
    email: false,
    password: false,
}


export const LoginScreen = () => {



    const [formData, setformData] = useState( inicialStateFormData );
    const [formErrors, setFormErrors] = useState( inicialStateFormErrors );
    const [errorMessage, setErrorMessage] = useState('');


    const onSubmit = (e) => {

        e.preventDefault();
        if( validator() ){
            login( formData.email, formData.password )
            .then( user => {
            })
            .catch( err => {
                setErrorMessage('Usuario o contrasena incorrectos')
            })
            .finally( () => {
                setFormErrors( inicialStateFormErrors );
                setformData( inicialStateFormData );
            })
        }
    } 


    const validator = () => {

        const errorTransferObject = { ...inicialStateFormErrors };
        let returnData = true

        if( !formData.email || !formData.email.trim() ){
            errorTransferObject.email = true;
            returnData = false;
        }

        if( !formData.password ){
            errorTransferObject.password = true;
            returnData = false;
        }


        setFormErrors({ ...errorTransferObject });

       return returnData;
    }

    const onChange = ({ target }) => {
        setformData({
            ...formData,
            [target.name]: target.value
        }); 
    }


    return (
        <div className="login-screen" style={{ backgroundImage: `url(${ backGround })` }}>
            <div className="card text-left card-login">
              <div className="card-body">
                <h4 className="card-title">Log in</h4>
                <hr/>
                <br/>
                <form className="form">
                    <div className={ formErrors.email ? "form-group has-danger" : "form-group" } >
                        <label>Email</label>
                        <input onChange={ onChange } value={ formData.email } type="email" name="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className={ formErrors.password ? "form-group has-danger" : "form-group" } >
                        <label>Password</label>
                        <input onChange={ onChange } value={ formData.password } type="password" name="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <button onClick={ onSubmit } className='btn btn-primary btn-block'>
                            Ingresar
                        </button>
                    </div>
                    { 
                        errorMessage && 
                        <>
                            <p className='text-danger text-center'>{ errorMessage }</p>
                        </>
                    }
                </form>
              </div>
            </div>
        </div>
    )
}
