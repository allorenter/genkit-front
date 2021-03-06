import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { userNameExists, signUpUser } from '../utils/api';
import ConnectionErrorContext from '../context/ConectionErrorContext';
import { setAuth } from '../utils/auth';
import AppIsLoadedContext from '../context/AppIsLoadedContext';
import { customFormLabel, customButton, theme, customLink } from '../styles/styles';
import styled from '@emotion/styled';

function UserControlSignUp(props){
    const [ , setConnectionError] = useContext(ConnectionErrorContext);
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

    const userNameValidator = async (rule, value) => {
        if(value === ''){
            return Promise.resolve();
        }
        try{
            const response = await userNameExists(value);
            if(response.data.data.exists){
                return Promise.reject(new Error('El nombre de usuario ya existe'));
            }
        }catch(err){
            setConnectionError(err.response ? true : false);
        }        
    };

    const passwordValidator = (rule, value) => {
        if(value && value.length < 5){
            return Promise.reject(new Error('La contraseña tiene que tener una longitud mayor a 5 caracteres'));
        }
        return Promise.resolve();
    }

    const confirmPasswordValidator = ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Las contrasñas no coinciden'));
        },
    });

    const handleFinish = async ({userName, password}) => {
        try{
            const response = await signUpUser(userName, password);
            setAuth(response.data.data.token);
            props.setParentModalVisible(false);
            setAppIsLoaded(false);
        }catch(err){
            setConnectionError(err.response ? true : false);
        }
    };
  
    const formLayout = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };

    return (
        <React.Fragment>
            <Form
                {...formLayout}
                hideRequiredMark={true}
                name='basic'
                initialValues={ { remember: false } }
                onFinish = {handleFinish}
            >
                <StyledFormItem
                    label='Nombre de usuario'
                    name='userName'
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Introduce un nombre de usuario',
                            whitespace: true,
                        },
                        { validator: userNameValidator }
                    ]}
                >
                    <Input />
                </StyledFormItem>
                <StyledFormItem
                    label='Contraseña'
                    name='password'
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Introduce una contraseña',
                            whitespace: true,
                        },
                        { validator: passwordValidator }
                    ]}
                >
                    <Input.Password />
                </StyledFormItem>
                <StyledFormItem
                    label='Confirmar contraseña'
                    name='confirmPassword'
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vuelve a escribir la contraseña',
                            whitespace: true,
                        },
                        confirmPasswordValidator,
                    ]}
                >
                    <Input.Password />
                </StyledFormItem>
                <Form.Item>
                    <StyledBtn htmlType='submit'>
                        Unirse
                    </StyledBtn>
                </Form.Item>
            </Form>
            <StyledLink type='link' onClick={() => props.setAccessType('logIn')} >
                ¿Ya tienes una cuenta?
            </StyledLink>
        </React.Fragment>
    );
}

export default UserControlSignUp;