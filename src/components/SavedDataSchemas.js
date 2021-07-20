import React, { useState, useContext } from 'react';
import { Modal, Button, Alert, Collapse } from 'antd';
import { theme, customButton, importantText } from '../styles/styles';
import styled from '@emotion/styled';
import { SaveOutlined } from '@ant-design/icons';
import LoginContext from '../context/LoginContext';
import UserControlForAccess from './UserControlForAccess';
import SaveDataSchema from './SaveDataSchema';
import SavedDataSchemasList from './SavedDataSchemasList';

function SavedDataSchemas(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [login] = useContext(LoginContext);
    const [titleUserAccess, setTitleUserAccess] = useState('');
    // counter para actualizar el listado
    const [updateList, setUpdateList] = useState(0);

    const OpenModalBtn = styled(Button)`
        ${customButton('white', theme.secondary)}    
        font-size: 1.2em;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
    `;

    const StyledText = styled.div`
        ${importantText()}
    `;

    return (
        <React.Fragment>
            <OpenModalBtn type='link' onClick={() => setModalVisible(true)} title="Guardar lista de propiedades">
                <SaveOutlined />
            </OpenModalBtn>
            {modalVisible && <Modal
                    title='Listas de propiedades guardadas'
                    visible={modalVisible}
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                    width={720}
                >
                    {login
                        ? <Collapse defaultActiveKey={['2']}>
                            <Collapse.Panel header="Guardar lista" key="1">
                                <SaveDataSchema updateList={updateList} setUpdateList={setUpdateList} />
                            </Collapse.Panel>
                            <Collapse.Panel header="Listados guardados" key="2">
                                <SavedDataSchemasList updateList={updateList} setUpdateList={setUpdateList} />
                            </Collapse.Panel>
                        </Collapse>
                        : <React.Fragment>
                            <Alert
                                message='Debes estar registrado para poder guardar listas de propiedades'
                                type="warning"
                            />
                            <StyledText style={{ marginTop: '1em', paddingLeft: '.4em' }}>
                                {titleUserAccess}
                            </StyledText>
                            <div style={{ padding: '.5em 1em' }}>
                                <UserControlForAccess setTitle={setTitleUserAccess} setParentModalVisible={setModalVisible} />
                            </div>
                        </React.Fragment>
                    }
                </Modal>
            }

        </React.Fragment>
    );
}

export default SavedDataSchemas;