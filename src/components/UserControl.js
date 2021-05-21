import React, { useContext, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import styled from '@emotion/styled';
import UserControlForAccess from './UserControlForAccess';
import UserControlLogOut from './UserControlLogOut';
import LoginContext from '../context/LoginContext';

function UserControl(props){
    const [login] = useContext(LoginContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState(login ? "Cerrar sesión" : "Registrarse");

    const StyledButton = styled(Button)`
        background: inherit!important;
        border: none;
        color: white;
    `;

    const contentComponent = ( 
        login 
            ? <UserControlLogOut setTitle={setTitle} setParentModalVisible={setModalVisible} /> 
            : <UserControlForAccess setTitle={setTitle} setParentModalVisible={setModalVisible} />
    );

    return (
        <React.Fragment>
            <StyledButton onClick={() => setModalVisible(true)}>
                <UserOutlined />
            </StyledButton>
            <Modal
                title={title}
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={480}
            >
                {contentComponent}
            </Modal>
        </React.Fragment>
    );
}

export default UserControl;