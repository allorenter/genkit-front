import { Switch } from "antd";
import usePropertyOptionsUpdate from "../hooks/usePropertyOptionsUpdate";
import styled from '@emotion/styled';
import { theme } from '../styles/styles';

function OptionsCreditCard(props){
    const updatePropertyOptions = usePropertyOptionsUpdate(props.propertyName);

    const StyledSwitch= styled(Switch)`
        margin-right: .5em;
        &.ant-switch-checked{
            background: ${theme.primary};
            opacity: 1;
        }
    `;

    return (
        <div>
            <StyledSwitch
                checkedChildren="Cualquiera"
                unCheckedChildren="Cualquiera"
                checked={props.options.type === 'any' ? true : false}
                onChange={() => updatePropertyOptions({ type: 'any' })}
                disabled={props.options.type === 'any' ? true : false}
            />
            <StyledSwitch
                checkedChildren="Visa"
                unCheckedChildren="Visa"
                checked={props.options.type === 'visa' ? true : false}
                onChange={() => updatePropertyOptions({ type: 'visa' })}
                disabled={props.options.type === 'visa' ? true : false}
            />
            <StyledSwitch
                checkedChildren="Mastercard"
                unCheckedChildren="Mastercard"
                checked={props.options.type === 'mastercard' ? true : false}
                onChange={() => updatePropertyOptions({ type: 'mastercard' })}
                disabled={props.options.type === 'mastercard' ? true : false}
            />
        </div>
    );
}

export default OptionsCreditCard;