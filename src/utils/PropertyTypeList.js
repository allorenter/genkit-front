import PropertyType from './PropertyType';

const PropertyTypeList = function(){
    const propertyTypeList = [
        PropertyType('nombre', 'Nombre', {}, 'personalData'),
        PropertyType('apellido', 'Apellido', {}, 'personalData'),
        PropertyType('apellidos', 'Apellidos', {}, 'personalData'),
        PropertyType('sexo', 'Sexo', {}, 'personalData'),
        PropertyType('dni', 'Dni', {}, 'personalData'),
        PropertyType('telefonoMovil', 'Teléfono móvil', {}, 'personalData'),
        PropertyType('codPostal', 'Código Postal', {}, 'places'),
        PropertyType('calle', 'Calle', {}, 'places'),
        PropertyType('poblacion', 'Población', {}, 'places'),
        PropertyType('provincia', 'Provincia', {}, 'places'),
        PropertyType('comunidad', 'Comunidad', {}, 'places'),
        PropertyType('cadena', 'Cadena', { size: 8 }, 'other'),
        PropertyType('numero', 'Número', { min: 1, max: 10 }, 'other'),
        PropertyType('tarjetaCredito', 'Tarjeta de crédito', { type: 'any' }, 'other'),
        PropertyType('boolean', 'Booleano', {}, 'other'),
        PropertyType('fecha', 'Fecha', { start: null, end: null }, 'other'),
        PropertyType('matricula', 'Matrícula', {}, 'vehicles'),
        PropertyType('marcaCoche', 'Marca de coche', {}, 'vehicles'),
    ];

    const getPropertyTypeById = (propertyId) => propertyTypeList.find( property => property.id === propertyId);

    return Object.freeze({
        propertyTypeList,
        getPropertyTypeById
    });
};

export default PropertyTypeList;