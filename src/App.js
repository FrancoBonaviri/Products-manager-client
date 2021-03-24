import React, { useEffect, useState } from 'react';
import './App.css';
import { LoggedLayout } from './layouts/LoggedLayout';
import { LoginScreen } from './Pages/loginScreen/loginScreen';

function App() {

  const [activeUser, setActiveUser] = useState(null)


  useEffect(() => {
    setActiveUser(true);
  }, [])




  return (
    ( !activeUser ? <LoginScreen /> : <LoggedLayout />)
  );
}

export default App;



