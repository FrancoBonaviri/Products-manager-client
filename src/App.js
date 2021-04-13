import React, { useEffect, useState } from 'react';
import './App.css';
import { LoggedLayout } from './layouts/LoggedLayout';
import { LoginScreen } from './Pages/loginScreen/loginScreen';
import { Provider } from 'react-redux'
import { store } from './store/store' 

function App() {

  const [activeUser, setActiveUser] = useState(null)


  useEffect(() => {
    setActiveUser(true);
  }, [])




  return (
    <Provider store={ store }>
      { !activeUser ? <LoginScreen /> : <LoggedLayout /> }
    </Provider>
  );
}

export default App;



