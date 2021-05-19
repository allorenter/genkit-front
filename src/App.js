import { useState } from 'react';
import 'antd/dist/antd.css';
import Loading from './components/Loading';
import GeneratorData from './components/GeneratorData';
import Header from './components/Header';
import LoginContext from './context/LoginContext';
import ConnectionError from './components/ConnectionError';
import ConnectionErrorContext from './context/ConectionErrorContext';

function App() {
  const [login, setLogin] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  
  return (
    <ConnectionError active={connectionError}>
      <Loading active={false} size={100} color={'#1ABC9C'}>
        <ConnectionErrorContext.Provider value={[connectionError, setConnectionError]}>
          <LoginContext.Provider value={[login, setLogin]}>
            <Header />
            <GeneratorData />
          </LoginContext.Provider>
        </ConnectionErrorContext.Provider>
      </Loading>
    </ConnectionError>
  );
}

export default App;
