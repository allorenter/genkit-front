import React, { useContext, useState } from 'react';
import { Row, Form, Input, Button } from 'antd';

const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
};

function UserControlSignIn(props){
    const [confirmDirty, setconfirmDirty] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);
    
    const userExists = (rule, value, callback) => {
        console.log("USERWXISTSSS", {rule, value, callback});
        callback("El usuario existe");
    };

    const handleSubmit = (e) => {

    };

    const rules = {
        userName: {
            validateTrigger: "onChange",
            rules: {}
        }, 
        password: {

        },
        confirmPassWord: {

        } 
    }; 

    return (
        <Form
            {...layout}
            hideRequiredMark={true}
            onSubmit={handleSubmit}
            name="basic"
            initialValues={ { remember: true } }
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Introduce un nombre de usuario",
                        whitespace: true,
                    },
                    { validator: userExists }
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
}

export default UserControlSignIn;