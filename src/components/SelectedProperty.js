import React, { useState, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { theme } from '../styles/styles';
import { darken } from 'polished';
import { Row, Col, Button } from 'antd';
import SelectedPropertyName from './SelectedPropertyName';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import GeneratorDataContext from '../context/GeneratorDataContext';
import OptionsRandomString from './OptionsRandomString';
import OptionsRandomNumber from './OptionsRandomNumber';
import OptionsCreditCard from './OptionsCreditCard';
import OptionsDate from './OptionsDate';

function SelectedProperty(props){
    const [renaiming, setRenaming] = useState(false);
    const [selectedProperties, setSelectedProperties] = useContext(GeneratorDataContext);
    
    const optionsComponent = {
        cadena: <OptionsRandomString options={props.options} propertyName={props.name} />,
        numero: <OptionsRandomNumber options={props.options} propertyName={props.name} />,
        tarjetaCredito: <OptionsCreditCard options={props.options} propertyName={props.name} />,
        fecha: <OptionsDate options={props.options} propertyName={props.name}/>
    };
    
    const StyledSelectedProperty = styled.div`
        background: ${theme.gray};
        border-radius: 4px;
        margin-bottom: .5em;
        border: 1px solid #f0f0f0;
        &>.ant-row{
            padding: 7px;
        }
    `;

    const IconButton = styled(Button)`
        color: ${theme.primary}
    `;
        
    return (
        <Draggable draggableId={props.name} index={props.index}>
            {
                (provided) => (
                    <StyledSelectedProperty ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                        <Row>
                            <Col style={{ display: 'flex', alignItems: 'center' }} xs={20} sm={20} md={18} lg={20} xl={20}>
                                <SelectedPropertyName name={props.name} renaiming={renaiming} setRenaming={setRenaming}/>
                            </Col>
                            <Col style={{display: 'flex'}} xs={4} sm={4} md={5} lg={4} xl={4}>
                                <IconButton style={{padding: '.1em .5em'}} type='link' onClick={() => setRenaming(true)}>
                                    <EditOutlined />
                                </IconButton>
                                <IconButton 
                                    type='link' 
                                    onClick={() => setSelectedProperties(selectedProperties.filter((property) => property.name !== props.name))} 
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            </Col>
                            {optionsComponent[props.type.id]}
                        </Row>
                    </StyledSelectedProperty>
                )
            }
        </Draggable>
    );
}

export default SelectedProperty;