import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { theme, customButton } from '../styles/styles';
import { Col, Modal, Tabs, Button, Row } from 'antd';
import PropertyTypeList from '../utils/PropertyTypeList';
import GeneratorDataContext from '../context/GeneratorDataContext';
import Property from '../utils/Property';
import { lighten } from 'polished';


function AddProperty(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProperties, setSelectedProperties] = useContext(GeneratorDataContext);

    const { propertyTypeList, getPropertyTypeById } = PropertyTypeList();

    const CustomDivMinHeight = styled.div`
        min-height: 16em;
    `;
    const GroupTab = styled(Tabs)`
        .ant-tabs-tab{
            color: ${theme.fontColor};
            font-size: 1em;
            &:hover, &:focus {
                color: ${theme.primary};
            }
        }
        .ant-tabs-tab-active{
            color: ${theme.primary};
        }
        .ant-tabs-ink-bar-animated{
            background: ${theme.primary};
            height: 3px;
        }
    `;
    const PropertySelector = styled(Button)`
        font-weight: 500;
        color: ${theme.primary};
        width: 90%;
        text-align: left;
        margin: .5em 0;
        &:hover {
            background: ${lighten(0.5, theme.secondary)}
        }
        @media (max-width: 576px) {
            text-align: center;
        }
    `;
    const BtnOpenModal = styled(Button)`
        ${customButton('white', theme.primary)}
        font-size: 1em;
        width: 100%;
    `;

    const addPropertyToContextGenerator = (propertyTypeToAdd) => {
        const repeatedType = selectedProperties.filter((property) => property?.type?.id === propertyTypeToAdd);
        const repeatedTypeCount = repeatedType.length;        
        let selectedPropertyName = propertyTypeToAdd;
        // en caso de que haya propiedades del mismo tipo
        if(repeatedTypeCount > 0){
            // asignamos nuevo nombre a la propiedad
            selectedPropertyName = `${propertyTypeToAdd}_${repeatedTypeCount + 1}`;
            // comprobamos si es posible asignar un nombre con un sufijo concatenado menor
            for (let i=repeatedTypeCount - 1; i >= 0; i--) {
                const newNameTemp = `${propertyTypeToAdd}_${i + 1}`;
                if(!repeatedType.find((property) => property.name === newNameTemp)){
                    selectedPropertyName = newNameTemp;
                }
            }
        }
        const propertyType = getPropertyTypeById(propertyTypeToAdd)
        const propertyToAdd = Property(selectedPropertyName, propertyType.defaultOptions, propertyType);
        setSelectedProperties([ propertyToAdd, ...selectedProperties ] );
        setModalVisible(false);
    };

    const renderPropertiesGroup = (group) => {
        // si el grupo es 'todos', muestro todas las propiedades
        const propertiesInGroup = group === 'all' ? propertyTypeList : propertyTypeList.filter(property => property.group === group); 
        // ordeno las propiedades por orden alfab??tico
        propertiesInGroup?.sort((a, b) => a.name > b.name ? 1 : -1);
        return propertiesInGroup?.map((property) => (
            <Col key={property.id} xs={24} sm={12} md={8} lg={8} xl={8} >
                <PropertySelector type='link' onClick={() => addPropertyToContextGenerator(property.id)} value={property.id}>
                    {property.name}
                </PropertySelector>
            </Col>
        ));
    };
    
    return (
        <React.Fragment>
            <BtnOpenModal onClick={() => setModalVisible(true)}>
                A??adir propiedad
            </BtnOpenModal>
            <Modal
                title='Elegir tipo'
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={720}
                style={{ paddingTop: '12px' }}
            >
                <GroupTab>
                    <Tabs.TabPane tab='Todos' key='all'>
                        <CustomDivMinHeight>
                            <Row>{renderPropertiesGroup('all')}</Row>
                        </CustomDivMinHeight>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Datos personales' key='personalData'>
                        <CustomDivMinHeight>
                            <Row>{renderPropertiesGroup('personalData')}</Row>
                        </CustomDivMinHeight>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Lugares' key='places'>
                        <CustomDivMinHeight>
                            <Row>{renderPropertiesGroup('places')}</Row>
                        </CustomDivMinHeight>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Otros' key='other'>
                        <CustomDivMinHeight>
                            <Row>{renderPropertiesGroup('other')}</Row>
                        </CustomDivMinHeight>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Veh??culos' key='vehicles'>
                        <CustomDivMinHeight>
                            <Row>{renderPropertiesGroup('vehicles')}</Row>
                        </CustomDivMinHeight>
                    </Tabs.TabPane>
                </GroupTab>
            </Modal>
        </React.Fragment>
    );
}

export default AddProperty;