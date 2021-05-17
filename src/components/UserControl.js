import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from '@emotion/styled';
import UserControlModal from './UserControlModal';
import { useState } from 'react';

function UserControl(props){
    const [modalVisible, setModalVisible] = useState(false);
    const StyledButton = styled(Button)`
        background: inherit!important;
        border: none;
        color: white;
    `;

    return (
        <StyledButton onClick={() => setModalVisible(true)}>
            <UserOutlined />
            <UserControlModal visible={modalVisible} onCancel={() => setModalVisible(false)} />
        </StyledButton>
    );
}

export default UserControl;