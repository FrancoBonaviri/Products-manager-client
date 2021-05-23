import React, { useEffect, useState } from 'react';
import './App.css';
import { LoggedLayout } from './layouts/LoggedLayout';
import { LoginScreen } from './Pages/loginScreen/loginScreen';
import { Provider } from 'react-redux'
import { store } from './store/store' 

import firebase from './services/firebaseService';
import 'firebase/auth';


function App() {

  const [activeUser, setActiveUser] = useState()
  const [isLogged, setIsLogged] = useState(true);


  firebase.auth().onAuthStateChanged(currentUser => {
  
    if( currentUser ) {
      setIsLogged( true );
    } else {
      setIsLogged( false );
    }
    
    setActiveUser( currentUser );
  });



  return (
    <Provider store={ store }>
      { isLogged ? <LoggedLayout /> : <LoginScreen /> }
    </Provider>
  );
}

export default App;



