import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import arrayMove from 'array-move';
import GeneratorDataContext from '../context/GeneratorDataContext';
import { customScrollbar } from '../styles/styles';
import SelectedProperty from './SelectedProperty';

function SelectedProperties(params) {
    
    const [selectedProperties, setSelectedProperties] = useContext(GeneratorDataContext);

    const ContainerSelectedProperties = styled.div`
        padding-top: 1em;
        height: calc(100vh - 165px);
        overflow: auto;
        ${customScrollbar()}
        @media (max-width: 768px) {
            height: auto;
        }
    `;

    const PropertiesList = React.memo(({ properties }) => properties.map(
        (property, index) => <SelectedProperty key={index} index={index} {...property} />
    ));

    function handleDragEnd(result){
        if(!result.destination){
            return ;
        }
        if(result.destination.index === result.source.index){
            return; 
        }
        setSelectedProperties(
            arrayMove(
                selectedProperties, 
                result.source.index,
                result.destination.index
            )
        );
    }

    return(
        <DragDropContext onDragEnd={handleDragEnd}>
            <ContainerSelectedProperties>
                <Droppable droppableId='list'>
                    {(provided) => (
                        <div ref={provided.innerRef}{...provided.droppableProps}>
                            <PropertiesList properties={selectedProperties} />
                        </div>
                    )}
                </Droppable>
            </ContainerSelectedProperties>
        </DragDropContext>
    );
}

export default SelectedProperties;