import { Modal } from 'antd';

function UserControlModal(props){
    return (
        <Modal title={props.title} visible={props.visible} onCancel={props.onCancel}>
            
        </Modal>
    );
}

export default UserControlModal;