import { InputNumber } from "antd";
import { useState } from "react";
import usePropertyOptionsUpdate from "../hooks/usePropertyOptionsUpdate";
import { optionsLabel } from '../styles/styles';
import styled from '@emotion/styled';

function OptionsRandomString(props){
    const [size, setSize] = useState(props.options.size);
    const updatePropertyOptions = usePropertyOptionsUpdate(props.propertyName);
    
    const StyledLabel = styled.label`
        ${optionsLabel()}
    `;

    return(
        <div>
            <StyledLabel>Longitud:</StyledLabel>
            <InputNumber 
                value={size}
                onChange={(value) => setSize(value)} 
                onKeyPress={event => {if (event.key === 'Enter') updatePropertyOptions({ size })}}
                onBlur={() => updatePropertyOptions({ size })}
            />
        </div>
    );
}

export default OptionsRandomString