import { Modal } from 'antd';

function UserControlModal(props){
    return (
        <Modal
            title={props.title}
            visible={props.visible}
            onOk={() => props.setVisible(false)}
            onCancel={() => props.setVisible(false)}
            footer={null}
            width={720}
        >
            {props.contentComponent}
        </Modal>
    );
}

export default UserControlModal;