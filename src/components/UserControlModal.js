import { Modal } from 'antd';

function UserControlModal(props){
    return (
        <Modal
            title='Elegir tipo'
            visible={props.visible}
            onOk={() => props.setVisible(false)}
            onCancel={() => props.setVisible(false)}
            footer={null}
            width={720}
        >
            
        </Modal>
    );
}

export default UserControlModal;