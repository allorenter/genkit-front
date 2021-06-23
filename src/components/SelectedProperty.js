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
        border-radius: 2px;
        border: 1px solid ${darken(0.05, theme.gray)};
        margin-bottom: 1em;
    `;

    const IconButton = styled(Button)`
        font-size: 1.05em;
        color: ${theme.primary};
        padding: 0;
        &:hover {
            color: ${theme.secondary};
        }
    `;
        
    return (
        <Draggable draggableId={props.name} index={props.index}>
            {
                (provided) => (
                    <StyledSelectedProperty ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                        <Row style={{padding: '.5em'}}>
                            <Col style={{ display: 'flex', alignItems: 'center' }} xs={18} sm={18} md={18} lg={18} xl={18}>
                                <SelectedPropertyName name={props.name} renaiming={renaiming} setRenaming={setRenaming}/>
                            </Col>
                            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                <IconButton type='link' onClick={() => setRenaming(true)}>
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