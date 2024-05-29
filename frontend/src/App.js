import React, { useState } from 'react';
import './App.css';
import PrivateRoutes from './components/private-routes/PrivateRoutes';
import tokenService from './components/services/localStorageService';

function App() {
  const [role, setRole] = useState(tokenService.getRole())
  const [userDetail, setUserDetail] = useState({})

  return (
    <div className="App">
      <PrivateRoutes role={role} setRole={setRole} userDetail={userDetail} setUserDetail={setUserDetail}/>  
    </div>
  );
}

export default App;
