import React, { useState } from 'react';
import AddPropertyModal from './AddPropertyModal'
import styled from '@emotion/styled';
import { theme, customButton } from '../styles/styles';
import { Button } from 'antd';

function AddProperty(props) {
    const [modalVisible, setModalVisible] = useState(false);
    
    const BtnOpenModal = styled(Button)`
        ${customButton('white', theme.primary)}
        font-size: 1.1em;
        margin: 30px 15px;
        width: calc(100% - 30px);
    `;
    
    return (
        <React.Fragment>
            <BtnOpenModal onClick={() => setModalVisible(true)}>
                Añadir propiedad
            </BtnOpenModal>
            <AddPropertyModal visible={modalVisible} setVisible={setModalVisible} />
        </React.Fragment>
    );
}

export default AddProperty;