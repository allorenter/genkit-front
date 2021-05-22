import { Row, Button } from 'antd';
import { removeAuth } from '../utils/auth';
import AppIsLoadedContext from '../context/AppIsLoadedContext';
import { useContext } from 'react';

function UserControlLogOut(props){
    const [, setAppIsLoaded] = useContext(AppIsLoadedContext);

    const handleConfirmButton = () => {
        removeAuth();
        props.setParentModalVisible(false);
        setAppIsLoaded(false);
    };

    const handleCancelButton = () => {
        props.setParentModalVisible(false);
    };
    
    return (
        <Row style={{flexDirection: 'column'}}>
            <p>¿Estás seguro de que quieres cerrar la sesión?</p>
            <Row>
                <Button onClick={handleConfirmButton} style={{marginRight: "1em"}}>Sí</Button>
                <Button onClick={handleCancelButton}>No</Button>
            </Row>
        </Row>
    );
}

export default UserControlLogOut;