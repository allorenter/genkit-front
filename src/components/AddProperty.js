import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { theme, customButton } from '../styles/styles';
import { Col, Modal, Tabs, Button, Row } from 'antd';
import PropertyTypeList from '../utils/PropertyTypeList';
import GeneratorDataContext from '../context/GeneratorDataContext';
import Property from '../utils/Property';

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
            font-size: 1.2em;
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
        margin: 10px 5%;
        text-align: left;
        width: 90%;
        ${customButton(theme.fontColor, theme.gray)}
        font-weight: normal;
        @media (max-width: 576px) {
            width: 100%;
            margin: 10px 0;
            text-align: center;
        }
    `;
    const BtnOpenModal = styled(Button)`
        ${customButton('white', theme.primary)}
        font-size: 1.1em;
        margin: 30px 15px;
        width: calc(100% - 30px);
    `;

    const addPropertyToContextGenerator = (propertyTypeToAdd) => {
        const repeatedTypeCount = selectedProperties.filter((property) => property?.type?.id === propertyTypeToAdd).length;        
        const selectedPropertyName = repeatedTypeCount === 0 ? propertyTypeToAdd : `${propertyTypeToAdd}_${repeatedTypeCount}`;
        setSelectedProperties([ Property(selectedPropertyName, getPropertyTypeById(propertyTypeToAdd)), ...selectedProperties ] );
        setModalVisible(false);
    };

    const renderPropertiesGroup = (group) => {
        // si el grupo es 'todos', muestro todas las propiedades
        const propertiesInGroup = group === 'all' ? propertyTypeList : propertyTypeList.filter(property => property.group === group); 
        // ordeno las propiedades por orden alfabético
        propertiesInGroup?.sort((a, b) => a.name > b.name ? 1 : -1);
        return propertiesInGroup?.map((property) => (
            <Col key={property.id} xs={24} sm={12} md={8} lg={8} xl={8} >
                <PropertySelector onClick={() => addPropertyToContextGenerator(property.id)} value={property.id}>
                    {property.name}
                </PropertySelector>
            </Col>
        ));
    };
    
    return (
        <React.Fragment>
            <BtnOpenModal onClick={() => setModalVisible(true)}>
                Añadir propiedad
            </BtnOpenModal>
            <Modal
                title='Elegir tipo'
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={720}
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
                    <Tabs.TabPane tab='Vehículos' key='vehicles'>
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