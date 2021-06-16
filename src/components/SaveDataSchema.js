import React, { useState, useContext } from 'react';
import { Col, Modal, Tabs, Button, Row } from 'antd';
import GeneratorDataContext from '../context/GeneratorDataContext';
import { theme, customButton } from '../styles/styles';
import styled from '@emotion/styled';
import { SaveOutlined } from '@ant-design/icons';

function SaveDataSchema(props){
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProperties, setSelectedProperties] = useContext(GeneratorDataContext);

    const IconButton = styled(Button)`
        ${customButton('white', theme.secondary)}    
        font-size: 1.4em;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
    `;

    return (
        <React.Fragment>
            <IconButton type='link' onClick={() => setModalVisible(true)} title="Guardar lista de propiedades">
                <SaveOutlined />
            </IconButton>
            <Modal
                title='Guardar lista de propiedades'
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={720}
            >
              
            </Modal>
        </React.Fragment>
    );
}

export default SaveDataSchema;