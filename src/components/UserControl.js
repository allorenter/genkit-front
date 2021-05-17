import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from '@emotion/styled';
import UserControlModal from './UserControlModal';
import React, { useState } from 'react';

function UserControl(props){
    const [modalVisible, setModalVisible] = useState(false);
    const StyledButton = styled(Button)`
        background: inherit!important;
        border: none;
        color: white;
    `;

    console.log('USER CONTROLLL', modalVisible);
    return (
        <React.Fragment>
            <StyledButton onClick={() => setModalVisible(true)}>
                <UserOutlined />
            </StyledButton>
            <UserControlModal visible={modalVisible} setVisible={setModalVisible} />
        </React.Fragment>
    );
}

export default UserControl;