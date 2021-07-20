import { InputNumber } from "antd";
import { useState } from "react";
import usePropertyOptionsUpdate from "../hooks/usePropertyOptionsUpdate";
import { optionsLabel } from '../styles/styles';
import styled from '@emotion/styled';

function OptionsRandomNumber(props){
    const [min, setMin] = useState(props.options.min);
    const [max, setMax] = useState(props.options.max);
    const updatePropertyOptions = usePropertyOptionsUpdate(props.propertyName);

    const StyledLabel = styled.label`
        ${optionsLabel()}
    `;

    return(
        <div>
            <StyledLabel>Mínimo:</StyledLabel>
            <InputNumber 
                value={min}
                onChange={(value) => setMin(value)} 
                onKeyPress={event => {if (event.key === 'Enter') updatePropertyOptions({ min, max })}}
                onBlur={() => updatePropertyOptions({ min, max })}
            />
            <StyledLabel style={{marginLeft: '2em'}}>Máximo:</StyledLabel>
            <InputNumber 
                value={max}
                onChange={(value) => setMax(value)} 
                onKeyPress={event => {if (event.key === 'Enter') updatePropertyOptions({ min, max })}}
                onBlur={() => updatePropertyOptions({ min, max })}
            />
        </div>
    );

}

export default OptionsRandomNumber;