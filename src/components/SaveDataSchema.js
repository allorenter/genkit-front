import React, { useState, useContext } from 'react';
import { Modal, Button, Input, Alert, notification } from 'antd';
import GeneratorDataContext from '../context/GeneratorDataContext';
import { theme, customButton } from '../styles/styles';
import styled from '@emotion/styled';
import { SaveOutlined } from '@ant-design/icons';
import { saveDataSchema } from '../utils/api';
import LoadingContext from '../context/LoadingContext';
import ConnectionErrorContext from '../context/ConectionErrorContext';

function SaveDataSchema(props){
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProperties] = useContext(GeneratorDataContext);
    const [dataSchemaName, setDataSchemaName] = useState('');
    const [, setLoading] = useContext(LoadingContext); 
    const [ , setConnectionError] = useContext(ConnectionErrorContext);
    const [showExistsMessage, setShowExistsMessage] = useState(false);

    const handleSaveClick = async () => {
        try{
            setShowExistsMessage(false);
            setLoading(true);
            const response = await saveDataSchema(selectedProperties, dataSchemaName);
            console.log("responsesese", response);
            setLoading(false);
            openSuccessNotification();
        }catch(err){
            console.log("STATATUSSS", err.response);
            if(err?.response?.status === 409){
                setShowExistsMessage(true);
                return false;
            }
            setConnectionError(err.response ? true : false);
            setLoading(false);
            setModalVisible(false);
        }
    };
    
    const OpenModalBtn = styled(Button)`
        ${customButton('white', theme.secondary)}    
        font-size: 1.2em;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
    `;

    const SaveListBtn = styled(Button)`
        ${customButton('white', theme.secondary)}    
    `;

    const openSuccessNotification = () => notification.open({
        message: 'Lista guardada con éxito',
        duration: 3,
    });

    return (
        <React.Fragment>
            <OpenModalBtn type='link' onClick={() => setModalVisible(true)} title="Guardar lista de propiedades">
                <SaveOutlined />
            </OpenModalBtn>
            {modalVisible 
            ? <Modal
                title='Guardar lista de propiedades'
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={720}
            >
                <label>Nombre del listado: </label>
                <Input onChange={(e) => setDataSchemaName(e.target.value)} />
                <SaveListBtn onClick={handleSaveClick}>
                    Guardar Lista
                </SaveListBtn>
                {(() => {
                    if(showExistsMessage){
                        return <Alert message="Ya existe una lista con ese nombre" type="warning" showIcon / >;
                    }
                })()}   
            </Modal>
            : null
            }
            
        </React.Fragment>
    );
}

export default SaveDataSchema;