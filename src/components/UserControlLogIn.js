import React, { useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { signInUser } from '../utils/api';
import ConnectionErrorContext from '../context/ConectionErrorContext';
import { setAuth } from '../utils/auth';
import AppIsLoadedContext from '../context/AppIsLoadedContext';
import { customFormLabel, customButton, theme, customLink } from '../styles/styles';
import styled from '@emotion/styled';

function UserControlLogIn(props){
    const [ , setConnectionError] = useContext(ConnectionErrorContext);
    const [authError, setAuthError] = useState(false);
    const [, setAppIsLoaded] = useContext(AppIsLoadedContext);

    const StyledFormItem = styled(Form.Item)`
        ${customFormLabel()}
    `;

    const StyledBtn = styled(Button)`
        ${customButton('white', theme.primary)} 
    `;

    const StyledLink = styled(Button)`
        ${customLink(theme.secondary)}
    `;

    const handleFinish = async ({userName, password}) => {
        try{
            const response = await signInUser(userName, password);
            setAuth(response.data.data.token);
            props.setParentModalVisible(false);
            setAppIsLoaded(false);
        }catch(err){
            if(err?.response?.status === 401){
                setAuthError(true);
                return false;
            }
            if(err?.response || !err?.status){
                setConnectionError(true);
                return false;
            }
        }
    };

    const formLayout = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };
    return (
        <React.Fragment>
            <Form
                {...formLayout}
                hideRequiredMark={true}
                name='basic'
                initialValues={ { remember: true } }
                onFinish = {handleFinish}
            >
                <StyledFormItem
                    label='Nombre de usuario'
                    name='userName'
                    rules={[
                        {
                            required: true,
                            message: 'Introduce un nombre de usuario',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </StyledFormItem>
                <StyledFormItem
                    label='Contraseña'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Introduce una contraseña',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input.Password />
                </StyledFormItem>
                <StyledFormItem>
                    <StyledBtn htmlType='submit'>
                        Acceder
                    </StyledBtn>
                </StyledFormItem>
            </Form>
            {authError && <p>ERROR AL AUTENTICAR</p>}
            <StyledLink type="link" onClick={() => props.setAccessType('signIn')} >
                Registrarse
            </StyledLink>
        </React.Fragment>
    );
}

export default UserControlLogIn;