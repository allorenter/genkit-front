import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import Loading from './components/Loading';
import GeneratorData from './components/GeneratorData';
import Header from './components/Header';
import LoginContext from './context/LoginContext';
import ConnectionError from './components/ConnectionError';
import ConnectionErrorContext from './context/ConectionErrorContext';
import AppIsLoadedContext from './context/AppIsLoadedContext';
import { checkAuth } from './utils/api';

function App() {
  const [login, setLogin] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    checkAuth().then((res) => {
      setLogin(true);
      setAppIsLoaded(true);
      
   })
   .catch((err) => {
      setLogin(false);
      setAppIsLoaded(true);
   });    
  },);

  return (
    <ConnectionError active={connectionError} setActive={setConnectionError} >
      <Loading active={!appIsLoaded} size={100} color={'#1ABC9C'}>
        <AppIsLoadedContext.Provider value={[appIsLoaded, setAppIsLoaded]}>
          <ConnectionErrorContext.Provider value={[connectionError, setConnectionError]}>
            <LoginContext.Provider value={[login, setLogin]}>
              <Header />
              <GeneratorData />
            </LoginContext.Provider>
          </ConnectionErrorContext.Provider>
        </AppIsLoadedContext.Provider>
      </Loading>
    </ConnectionError>
  );
}

export default App;
