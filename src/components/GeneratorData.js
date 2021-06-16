import { useState } from 'react';
import AddProperty from './AddProperty';
import GeneratorDataContext from '../context/GeneratorDataContext';
import PropertyTypeList from '../utils/PropertyTypeList';
import Property from '../utils/Property';
import { Row, Col, Tabs } from 'antd';
import SelectedProperties from './SelectedProperties';
import DataPreview from './DataPreview';
import GeneratedDataDownload from './GeneratedDataDownload';
import SaveDataSchema from './SaveDataSchema';
import styled from '@emotion/styled';

const { getPropertyTypeById } = PropertyTypeList();
const { TabPane } = Tabs;

function GeneratorData(props){
    const [selectedProperties, setSelectedProperties] = useState([
        Property('nombre', getPropertyTypeById('nombre')),
        Property('dni', getPropertyTypeById('dni')),
    ]);
    const [previewType, setPreviewType] = useState('csv');

    const AlignRightButtons = styled.div`
        position: absolute;
        right: 5%;
        z-index: 1;
        top: 1.5em;
    `;

    return (
        <GeneratorDataContext.Provider value={[selectedProperties, setSelectedProperties]}>
            <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={6} type='flex' style={{padding: '2em'}}>
                    <Row>                
                        <Col xs={8} sm={6} md={4} lg={4} xl={3} type='flex' style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                            <SaveDataSchema />
                        </Col>
                        <Col xs={16} sm={18} md={20} lg={20} xl={21} type='flex'>
                            <AddProperty />
                        </Col>
                    </Row>
                    <SelectedProperties />
                </Col>
                <Col xs={24} sm={24} md={16} lg={16} xl={18} style={{padding: '1em'}}>
                    <AlignRightButtons>
                        <GeneratedDataDownload />
                    </AlignRightButtons>
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