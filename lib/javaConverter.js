let converter = {};

converter.getClassHeader = (className) => {
	return 'public class ' + className + ' {';
}

converter.getClassFooter = () => {
	return '}';
}

const BOOLEAN = 'boolean';
const STRING = 'string';
const INTEGER = 'integer';
const DOUBLE = 'double';
const ARRAY = 'array';
const OBJECT = 'object';
const DEFAULT = 'default';

converter.getPropertyConversion = (propertyName, propertyValue) => {

	let propertyType = determineType(propertyValue);

	switch(propertyType) {
		case BOOLEAN:
			return 'priavte Boolean ' + propertyName + ';'
		case STRING:
			return 'private String ' + propertyName + ';'
		case INTEGER:
			return 'private Integer ' + propertyName + ';'
		case DOUBLE:
			return 'private Double ' + propertyName + ";"
		case ARRAY: 

		case OBJECT:
			let objectName = propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
			return 'private ' + objectName + ' ' + propertyName + ";"
		case DEFAULT:

		default:
			console.log('Unhandled case: ' + propertyType);
	}

	return 'private Object ' + propertyName + ';'
}

const determineType = (propertyValue) => {

	let type = typeof propertyValue;

	if (type == 'boolean') {
		return BOOLEAN;
	}

	if (type == 'string') {
		return STRING;
	}

	if (type == 'number') {
		let str = propertyValue.toString();

		if (str.includes('.')) {
			return DOUBLE;
		} else {
			return INTEGER;
		}
	}

	if (type == 'object') {
		if (propertyValue instanceof Array) {
			return ARRAY;
		} else {
			return OBJECT;
		}
	}

	console.log('Unhandled case: ' + type);
	return DEFAULT;
}

module.exports = converter;