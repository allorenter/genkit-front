import { DatePicker } from 'antd';
import usePropertyOptionsUpdate from "../hooks/usePropertyOptionsUpdate";
import moment from 'moment';

const { RangePicker } = DatePicker;

function OptionsDate(props){
    const updatePropertyOptions = usePropertyOptionsUpdate(props.propertyName);

    const onChange = (value) => {
        const start = value[0].format();
        const end = value[1].format();
        updatePropertyOptions({ start, end });
    };

    //value={[moment(props.options.start), moment(props.options.end)]}
    return (
        <RangePicker 
            placeholder={['Fecha inicio', 'Fecha Fin']} 
            {...(props.options.start && props.options.end && { value: [moment(props.options.start), moment(props.options.end)] })}
            onChange={(val) => onChange(val)} 
        />
    );
}

export default OptionsDate;