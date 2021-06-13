import React, { useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { signInUser } from '../utils/api';
import ConnectionErrorContext from '../context/ConectionErrorContext';
import { setAuth } from '../utils/auth';
import AppIsLoadedContext from '../context/AppIsLoadedContext';

function UserControlLogIn(props){
    const [ , setConnectionError] = useContext(ConnectionErrorContext);
    const [authError, setAuthError] = useState(false);
    const [, setAppIsLoaded] = useContext(AppIsLoadedContext);

    const handleFinish = async ({userName, password}) => {
        try{
            const response = await signInUser(userName, password);
            setAuth(response.data.data.token);
            props.setParentModalVisible(false);
            setAppIsLoaded(false);
        }catch(err){
            console.log(err.response);
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
                <Form.Item
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
                </Form.Item>
                <Form.Item
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
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Acceder
                    </Button>
                </Form.Item>
            </Form>
            {authError && <p>ERROR AL AUTENTICAR</p>}
            <Button type="link" onClick={() => props.setAccessType('signIn')} >
                Registrarse
            </Button>
        </React.Fragment>
    );
}

export default UserControlLogIn;