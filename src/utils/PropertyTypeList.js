import PropertyType from './PropertyType';

const PropertyTypeList = function(){
    const propertyTypeList = [
        PropertyType('nombre', 'Nombre', {}, 'personalData'),
        PropertyType('apellido', 'Apellido', {}, 'personalData'),
        PropertyType('apellidos', 'Apellidos', {}, 'personalData'),
        PropertyType('sexo', 'Sexo', {}, 'personalData'),
        PropertyType('dni', 'Dni', {}, 'personalData'),
        PropertyType('mobilePhone', 'Teléfono móvil', {}, 'personalData'),
        PropertyType('codPostal', 'Código Postal', {}, 'places'),
        PropertyType('calle', 'Calle', {}, 'places'),
        PropertyType('poblacion', 'Población', {}, 'places'),
        PropertyType('provincia', 'Provincia', {}, 'places'),
        PropertyType('comunidad', 'Comunidad', {}, 'places'),
        PropertyType('randomString', 'Cadena Aleatoria', { longitud: 8 }, 'other'),
        PropertyType('randomNumber', 'Número Aleatorio', { numMin: 1, numMax: 10 }, 'other'),
        PropertyType('creditCard', 'Tarjeta de crédito', { tipo: 'cualquiera' }, 'other'),
        PropertyType('boolean', 'Booleano', {}, 'other'),
        PropertyType('date', 'Fecha', { init: null, fechaFin: null }, 'other'),
        PropertyType('matricula', 'Matrícula', {}, 'vehicles'),
        PropertyType('carBrand', 'Marca de coche', {}, 'vehicles'),
    ];

    const getPropertyTypeById = (propertyId) => propertyTypeList.find( property => property.id === propertyId);

    return Object.freeze({
        propertyTypeList,
        getPropertyTypeById
    });
};

export default PropertyTypeList;