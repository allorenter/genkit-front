import { useState, useEffect } from 'react';
import UserControlSignIn from './UserControlSignIn';
import UserControlLogIn from './UserControlLogIn';

function UserControlForAccess(props){
    const [accessType, setAccessType] = useState('signIn')

    useEffect(() => {
        props.setTitle(accessType === 'signIn' ? 'Registrarse' : 'Iniciar sesión');
    }, [accessType, props]);

    const component = (
        accessType === 'signIn' 
            ? <UserControlSignIn setAccessType={setAccessType} setParentModalVisible={props.setParentModalVisible} /> 
            : <UserControlLogIn setAccessType={setAccessType} setParentModalVisible={props.setParentModalVisible} />
    );

    return (component);

}

export default UserControlForAccess;