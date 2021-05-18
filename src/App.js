import { useState } from 'react';
import 'antd/dist/antd.css';
import Loading from './components/Loading';
import GeneratorData from './components/GeneratorData';
import Header from './components/Header';
import LoginContext from './context/LoginContext';

function App() {
  const [login, setLogin] = useState(true);
  
  return (
    <Loading active={false} size={100} color={'#1ABC9C'}>
      <LoginContext.Provider value={[login, setLogin]}>
        <Header />
        <GeneratorData />
      </LoginContext.Provider>
    </Loading>
  );
}

export default App;
