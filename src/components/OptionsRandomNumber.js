import { InputNumber } from "antd";
import { useState } from "react";
import usePropertyOptionsUpdate from "../hooks/usePropertyOptionsUpdate";

function OptionsRandomNumber(props){
    const [min, setMin] = useState(props.options.min);
    const [max, setMax] = useState(props.options.max);
    const updatePropertyOptions = usePropertyOptionsUpdate(props.propertyName);

    return(
        <div>
            <label>Mínimo:</label>
            <InputNumber 
                value={min}
                onChange={(value) => setMin(value)} 
                onKeyPress={event => {if (event.key === 'Enter') updatePropertyOptions({ min, max })}}
                onBlur={() => updatePropertyOptions({ min, max })}
            />
            <label>Máximo: </label>
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