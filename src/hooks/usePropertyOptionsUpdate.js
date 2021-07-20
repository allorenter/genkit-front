import { useContext } from 'react';
import GeneratorDataContext from '../context/GeneratorDataContext';

const useUpdatePropertyOptions = (propertyName) => {
    const [selectedProperties, setSelectedProperties] = useContext(GeneratorDataContext);
    // actualizo la propiedad en el context del generador
    const updateContext = (newOptions) => setSelectedProperties(selectedProperties.map((property) => {
        if(property.name === propertyName){
            property.options = newOptions;
        }
        return property;
    }));
    return updateContext;
};

export default useUpdatePropertyOptions;