import React from 'react'
import backGround from '../../assets/images/login-register.jpg'
import './loginScreen.css'

export const LoginScreen = () => {


    return (
        <div className="login-screen" style={{ backgroundImage: `url(${ backGround })` }}>
            <div className="card text-left card-login">
              <div className="card-body">
                <h4 className="card-title">Log in</h4>
                <hr/>
                <br/>
                <form className="form">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                </form>
              </div>
            </div>
        </div>
    )
}
