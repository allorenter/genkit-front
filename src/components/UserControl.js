import React, { useContext, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from '@emotion/styled';
import UserControlModal from './UserControlModal';
import UserControlSignIn from './UserControlSignIn';
import UserControlLogIn from './UserControlLogIn';
import UserControlLogOut from './UserContorlLogOut';
import LoginContext from '../context/LoginContext';

function UserControl(props){
    const [login] = useContext(LoginContext);
    const [modalVisible, setModalVisible] = useState(false);
    const StyledButton = styled(Button)`
        background: inherit!important;
        border: none;
        color: white;
    `;

    const contentComponent = login ? <UserControlLogOut /> : <UserControlSignIn />;
    const title = login ? "Cerrar sesión" : "Registrarse";

    return (
        <React.Fragment>
            <StyledButton onClick={() => setModalVisible(true)}>
                <UserOutlined />
            </StyledButton>
            <UserControlModal 
                visible={modalVisible} 
                setVisible={setModalVisible} 
                title={title}
                contentComponent={contentComponent}
            />
        </React.Fragment>
    );
}

export default UserControl;