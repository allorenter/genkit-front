import React, { useContext, useRef, useState } from 'react';
import { Button, Input, Alert, Form } from 'antd';
import GeneratorDataContext from '../context/GeneratorDataContext';
import { customFormLabel } from '../styles/styles';
import styled from '@emotion/styled';
import { saveDataSchema } from '../utils/api';
import ConnectionErrorContext from '../context/ConectionErrorContext';

function SaveDataSchema(props) {
    const [selectedProperties] = useContext(GeneratorDataContext);
    const [loading, setLoading] = useState(false);
    const [, setConnectionError] = useContext(ConnectionErrorContext);
    const [schemaNameExists, setSchemaNameExists] = useState(false);
    const [createdSchemaName, setCreatedSchemaName] = useState(false);
    const formRef = useRef(null);

    const StyledFormItem = styled(Form.Item)`
        ${customFormLabel()}
    `;

    const handleFinish = async (value) => {
        setCreatedSchemaName(false);
        try {
            setLoading(true);
            await saveDataSchema(selectedProperties, value.schemaName);
            setLoading(false);
            setSchemaNameExists(false);
            formRef.current.resetFields();
            setCreatedSchemaName(true);
            props.setUpdateList(props.updateList + 1);
        } catch (err) {
            if (err?.response?.status === 409) {
                setLoading(false);
                setSchemaNameExists(true);
                return false;
            }
            setConnectionError(err.response ? true : false);
        }
    };

    const StyledLabel = styled.label`
        ${customFormLabel()}
    `;

    return (
        <Form
            hideRequiredMark={true}
            name="form"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={handleFinish}
            ref={formRef}
        >
            {schemaNameExists && <Alert
                type="warning"
                message="Ya hay guardada una lista con ese nombre"
                showIcon
                style={{marginBottom: '1em'}}
            />}
            {createdSchemaName && <Alert
                type="success"
                message="Lista creada con éxito"
                showIcon
                style={{marginBottom: '1em'}}
            />}
            <StyledFormItem
                label={<StyledLabel>Nombre del listado: </StyledLabel>}
                name="schemaName"
                rules={[{ required: true, message: 'Debes escribir un nombre para la lista' }]}
            >
                <Input />
            </StyledFormItem>
            <Form.Item wrapperCol={{ label: 24 }}>
                <Button 
                    loading={loading} 
                    type="primary" 
                    htmlType="submit"                    
                >
                    Guardar
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SaveDataSchema;