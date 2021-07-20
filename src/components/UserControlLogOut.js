import { Row, Button } from 'antd';
import { removeAuth } from '../utils/auth';
import AppIsLoadedContext from '../context/AppIsLoadedContext';
import { useContext } from 'react';
import styled from '@emotion/styled';
import { customButton, theme } from '../styles/styles';

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
    
    const StyledText = styled.p`
        font-weight: 600;
    `;

    const StyledBtn = styled(Button)`
        ${customButton('white', theme.secondary)}
    `;

    return (
        <Row style={{flexDirection: 'column'}}>
            <StyledText>¿Estás seguro de que quieres cerrar la sesión?</StyledText>
            <Row>
                <StyledBtn onClick={handleConfirmButton} style={{marginRight: "1em"}}>Sí</StyledBtn>
                <Button onClick={handleCancelButton}>No</Button>
            </Row>
        </Row>
    );
}

export default UserControlLogOut;