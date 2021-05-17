import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Loading(props) {
    const antIcon = <LoadingOutlined type='loading' style={{ fontSize: props.size, color: props.color }} spin />;
    return (
        <Spin style={{ textAlign: 'center' }} spinning={props.active} indicator={antIcon}>
            {props.children}    
        </Spin>
    );
}

export default Loading;