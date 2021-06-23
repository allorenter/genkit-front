import React, { useState, useContext } from 'react';
import { Modal, Button, Input, Alert, notification } from 'antd';
import GeneratorDataContext from '../context/GeneratorDataContext';
import { theme, customButton, importantText } from '../styles/styles';
import styled from '@emotion/styled';
import { SaveOutlined } from '@ant-design/icons';
import { saveDataSchema } from '../utils/api';
import LoadingContext from '../context/LoadingContext';
import ConnectionErrorContext from '../context/ConectionErrorContext';
import LoginContext from '../context/LoginContext';
import UserControlForAccess from './UserControlForAccess';

function SaveDataSchema(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProperties] = useContext(GeneratorDataContext);
    const [dataSchemaName, setDataSchemaName] = useState('');
    const [, setLoading] = useContext(LoadingContext);
    const [, setConnectionError] = useContext(ConnectionErrorContext);
    const [showExistsMessage, setShowExistsMessage] = useState(false);
    const [login] = useContext(LoginContext);
    const [titleUserAccess, setTitleUserAccess] = useState('');

    const handleSaveClick = async () => {
        try {
            setShowExistsMessage(false);
            setLoading(true);
            await saveDataSchema(selectedProperties, dataSchemaName);
            setLoading(false);
            openSuccessNotification();
        } catch (err) {
            if (err?.response?.status === 409) {
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
    
    const StyledText = styled.div`
        ${importantText()}
    `;

    return (
        <React.Fragment>
            <OpenModalBtn type='link' onClick={() => setModalVisible(true)} title="Guardar lista de propiedades">
                <SaveOutlined />
            </OpenModalBtn>
            {modalVisible
                ? <Modal
                    title='Guardar listas de propiedades'
                    visible={modalVisible}
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                    width={720}
                >
                    {login
                        ? <React.Fragment>
                            <label>Nombre del listado: </label>
                            <Input onChange={(e) => setDataSchemaName(e.target.value)} />
                            <SaveListBtn onClick={handleSaveClick}>
                                Guardar Lista
                            </SaveListBtn>
                            {(() => {
                                if (showExistsMessage) {
                                    return <Alert message="Ya existe una lista con ese nombre" type="warning" showIcon />;
                                }
                            })()}
                        </React.Fragment>
                        : <React.Fragment>
                            <Alert
                                message='Debes estar registrado para poder guardar listas de propiedades'
                                type="warning"
                                
                            />
                            <StyledText style={{marginTop: '1em', paddingLeft: '.4em'}}>
                                {titleUserAccess}
                            </StyledText>
                            <div style={{padding: '.5em 1em'}}>
                                <UserControlForAccess setTitle={setTitleUserAccess} setParentModalVisible={setModalVisible} />
                            </div>
                        </React.Fragment>
                    }


                </Modal>
                : null
            }

        </React.Fragment>
    );
}

export default SaveDataSchema;