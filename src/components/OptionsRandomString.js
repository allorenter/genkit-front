import { InputNumber } from "antd";
import { useState } from "react";
import usePropertyOptionsUpdate from "../hooks/usePropertyOptionsUpdate";

function OptionsRandomString(props){
    const [size, setSize] = useState(props.options.size);
    const updatePropertyOptions = usePropertyOptionsUpdate(props.propertyName);
    
    return(
        <div>
            <label>Longitud máxima: </label>
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