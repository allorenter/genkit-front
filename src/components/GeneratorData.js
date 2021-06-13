import { useState } from 'react';
import AddProperty from './AddProperty';
import GeneratorDataContext from '../context/GeneratorDataContext';
import PropertyTypeList from '../utils/PropertyTypeList';
import Property from '../utils/Property';
import { Row, Col, Tabs } from 'antd';
import SelectedProperties from './SelectedProperties';
import DataPreview from './DataPreview';
import GeneratedDataDownload from './GeneratedDataDownload';

const { getPropertyTypeById } = PropertyTypeList();
const { TabPane } = Tabs;

function GeneratorData(props){
    const [selectedProperties, setSelectedProperties] = useState([
        Property('nombre', getPropertyTypeById('nombre')),
        Property('dni', getPropertyTypeById('dni')),
    ]);
    const [previewType, setPreviewType] = useState('csv');

    return (
        <GeneratorDataContext.Provider value={[selectedProperties, setSelectedProperties]}>
            <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={6} type='flex' style={{padding: '2em'}}>
                    <AddProperty />
                    <SelectedProperties />
                </Col>
                <Col xs={24} sm={24} md={16} lg={16} xl={18} style={{padding: '1em'}}>
                    <GeneratedDataDownload />
                    <Tabs defaultActiveKey="csv" onChange={(key) => setPreviewType(key)}>
                        <TabPane tab='CSV' key='csv'>
                            <DataPreview type={previewType} />
                        </TabPane>
                        <TabPane tab='JSON' key='json'>
                            <DataPreview type={previewType} />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row> 
        </GeneratorDataContext.Provider>
    );
}

export default GeneratorData;