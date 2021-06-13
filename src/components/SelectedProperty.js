import React, { useState, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { theme } from '../styles/styles';
import { darken } from 'polished';
import { Row, Col, Button } from 'antd';
import SelectedPropertyName from './SelectedPropertyName';
import Icon, { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import GeneratorDataContext from '../context/GeneratorDataContext';

function SelectedProperty(props){
    const [renaiming, setRenaming] = useState(false);
    const [selectedProperties, setSelectedProperties] = useContext(GeneratorDataContext);

    const StyledSelectedProperty = styled.div`
        background: ${theme.gray};
        border-radius: 4px;
        border: 1px solid ${darken(0.1, theme.gray)};
        margin-bottom: 1em;
        &>.ant-row{
            padding: 7px;
            &:first-child{
                
            }
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
                        </Row>
                    </StyledSelectedProperty>
                )
            }
        </Draggable>
    );
}

export default SelectedProperty;