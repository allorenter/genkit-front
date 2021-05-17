import { useState } from 'react';
import AddProperty from './AddProperty';
import GeneratorDataContext from '../context/GeneratorDataContext';
import PropertyTypeList from '../utils/PropertyTypeList';
import Property from '../utils/Property';
import { Row, Col } from 'antd';
import SelectedProperties from './SelectedProperties';

const { getPropertyTypeById } = PropertyTypeList();

function GeneratorData(props){
    const [selectedProperties, setSelectedProperties] = useState([
        Property('nombre', getPropertyTypeById('nombre')),
        Property('dni', getPropertyTypeById('dni')),
    ]);
    return (
        <GeneratorDataContext.Provider value={[selectedProperties, setSelectedProperties]}>
            <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={6} type='flex'>
                    <AddProperty />
                    <SelectedProperties />
                </Col>
                <Col xs={24} sm={24} md={16} lg={16} xl={18}>
                    
                </Col>
            </Row> 
            
        </GeneratorDataContext.Provider>
    );
}

export default GeneratorData;