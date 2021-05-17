import 'antd/dist/antd.css';
import Loading from './components/Loading';
import GeneratorData from './components/GeneratorData';
import Header from './components/Header';

function App() {
  
  return (
    <Loading active={false} size={100} color={'#1ABC9C'}>
      <Header />
      <GeneratorData />
    </Loading>
  );
}

export default App;
