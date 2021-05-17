import PropertyType from './PropertyType';

const PropertyTypeList = function(){
    const propertyTypeList = [
        PropertyType('nombre', 'Nombre', null, 'personalData'),
        PropertyType('apellido', 'Apellido', null, 'personalData'),
        PropertyType('apellidos', 'Apellidos', null, 'personalData'),
        PropertyType('sexo', 'Sexo', null, 'personalData'),
        PropertyType('dni', 'Dni', null, 'personalData'),
        PropertyType('mobilePhone', 'Teléfono móvil', null, 'personalData'),
        PropertyType('codPostal', 'Código Postal', null, 'places'),
        PropertyType('calle', 'Calle', null, 'places'),
        PropertyType('poblacion', 'Población', null, 'places'),
        PropertyType('provincia', 'Provincia', null, 'places'),
        PropertyType('comunidad', 'Comunidad', null, 'places'),
        PropertyType('randomString', 'Cadena Aleatoria', { longitud: 8 }, 'other'),
        PropertyType('randomNumber', 'Número Aleatorio', { numMin: 1, numMax: 10 }, 'other'),
        PropertyType('creditCard', 'Tarjeta de crédito', { tipo: 'cualquiera' }, 'other'),
        PropertyType('boolean', 'Booleano', null, 'other'),
        PropertyType('date', 'Fecha', { init: null, fechaFin: null }, 'other'),
        PropertyType('matricula', 'Matrícula', null, 'vehicles'),
        PropertyType('carBrand', 'Marca de coche', null, 'vehicles'),
    ];

    const getPropertyTypeById = (propertyId) => propertyTypeList.find( property => property.id === propertyId);

    return Object.freeze({
        propertyTypeList,
        getPropertyTypeById
    });
};

export default PropertyTypeList;