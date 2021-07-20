import React, { useContext, useState } from 'react';
import { Input } from 'antd';
import GeneratorDataContext from '../context/GeneratorDataContext';
import styled from '@emotion/styled';

function SelectedPropertyName(props){
    const [selectedProperties, setSelectedProperties] = useContext(GeneratorDataContext);
    const [name, setName] = useState(props.name);

    const rename = () => {
        // si el nombre es '' o el que tenía al inicio, dejo el mismo y no continúo
        if(name === '' || name === props.name){
            setName(props.name);    
            props.setRenaming(false);
            return ;
        }
        let newName = name;
        const nameWithoutIndex = name.substring(0, name.lastIndexOf('_')) || name;
        const repeatedPropertyName = selectedProperties.filter((property) => {
            const compareName = property.name.substring(0, property.name.lastIndexOf('_')) || property.name;
            return compareName === nameWithoutIndex;
        });
        const repeatedPropertyNameCount = repeatedPropertyName.length;
        // en caso de que haya propiedades con el mismo nombre 'raíz'
        if(repeatedPropertyNameCount > 0){
            // asignameos nuevo nombre a la propiedad
            newName = `${nameWithoutIndex}_${repeatedPropertyNameCount}`;
            // comprobamos si es posible asignar un nombre con un sufijo concatenado menor
            for (let i=repeatedPropertyNameCount - 1; i >= 0; i--) {
                const newNameTemp = `${nameWithoutIndex}_${i + 1}`;
                if(!repeatedPropertyName.find((property) => property.name === newNameTemp)){
                    newName = newNameTemp;
                }
            }
        }
        setName(newName);
        // renombro la propiedad en el context del generador
        setSelectedProperties(selectedProperties.map((property) => {
            const rename = (property.name === props.name) ? newName : property.name;
            property.name = rename.replace(/ /g, '');
            return property;
        }));
        props.setRenaming(false);
    };

    const PropertyName = styled.span`
        font-weight: 600;
        font-size: 1em;
    `;

    return (
        <React.Fragment>
            { props.renaiming 
                ? <Input
                    autoFocus={true}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={rename}
                    onKeyPress={event => {if (event.key === 'Enter') rename()}}
                    value={name}
                    placeholder={name}
                /> 
                : <PropertyName>{props.name}</PropertyName>
            }
        </React.Fragment>
    );
}

export default SelectedPropertyName;