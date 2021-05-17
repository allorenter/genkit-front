import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { theme } from '../styles/styles';
import { darken } from 'polished';

function SelectedProperty(props){
    
    const StyledSelectedProperty = styled.div`
        background: ${theme.gray};
        border-radius: 4px;
        border: 1px solid ${darken(0.1, theme.gray)};
        margin-bottom: 1em;
        &>.ant-row{
            padding: 7px;
            &:first-child{
                border-bottom: ${props.property.opciones ? `1px solid ${darken(0.1, theme.gray)}`: `none`}
            }
        }
    `;
    
    return (
        <Draggable draggableId={props.property.name} index={props.index}>
            {
                (provided) => (
                    <StyledSelectedProperty ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>

                    </StyledSelectedProperty>
                )
            }
        </Draggable>
    );
}

export default SelectedProperty;