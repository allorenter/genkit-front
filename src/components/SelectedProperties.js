import { useContext } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import arrayMove from 'array-move';
import GeneratorDataContext from '../context/GeneratorDataContext';
import { theme, customScrollbar } from '../styles/styles';
import SelectedProperty from './SelectedProperty';

function SelectedProperties(params) {
    
    const [selectedProperties, setSelectedProperties] = useContext(GeneratorDataContext);

    const ContainerSelectedProperties = styled.div`
        padding: 0 15px;
        height: calc(100vh - 165px);
        overflow: auto;
        ${customScrollbar()}
        @media (max-width: 768px) {
        height: auto;
        }
    `;

    function handleDragEnd(){

    }

    return(
        <DragDropContext onDragEnd={handleDragEnd}>
            <ContainerSelectedProperties>
                <Droppable droppableId='list'>
                    {
                        (provided) => (
                            <div ref={provided.innerRef}{...provided.droppableProps}>
                                
                            </div>
                        ) 
                    }
                </Droppable>
            </ContainerSelectedProperties>
        </DragDropContext>
    );
}

export default SelectedProperties;