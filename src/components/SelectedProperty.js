import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { theme } from '../styles/styles';
import { darken } from 'polished';
import { Row, Col } from 'antd';

function SelectedProperty(props){
    
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
        
    console.log("PROPERTY", props)
    return (
        <Draggable draggableId={props.name} index={props.index}>
            {
                (provided) => (
                    <StyledSelectedProperty ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                        <Row>
                            <Col xs={20} sm={20} md={18} lg={20} xl={20}>
                                { props.name }
                            </Col>

                        </Row>
                    </StyledSelectedProperty>
                )
            }
        </Draggable>
    );
}

export default SelectedProperty;