import React, { useContext, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import styled from '@emotion/styled';
import UserControlForAccess from './UserControlForAccess';
import UserControlLogOut from './UserControlLogOut';
import LoginContext from '../context/LoginContext';
import { theme, customButton } from '../styles/styles';

function UserControl(props){
    const [login] = useContext(LoginContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState(login ? "Cerrar sesión" : "Registrarse");

    const StyledBtn = styled(Button)`
        ${customButton('white', theme.secondary)}
        border-radius: 0;
        font-size: 1.2em;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return (
        <React.Fragment>
            
            <StyledBtn onClick={() => setModalVisible(true)}>
                <UserOutlined />
            </StyledBtn>
            {modalVisible && <Modal
                title={title}
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={480}
            >
                { login 
                    ? <UserControlLogOut setTitle={setTitle} setParentModalVisible={setModalVisible} /> 
                    : <UserControlForAccess setTitle={setTitle} setParentModalVisible={setModalVisible} />
                }
            </Modal>}
        </React.Fragment>
    );
}

export default UserControl;