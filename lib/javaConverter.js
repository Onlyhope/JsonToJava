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
			return '\tprivate Boolean ' + propertyName + ';'
		case STRING:
			return '\tprivate String ' + propertyName + ';'
		case INTEGER:
			return '\tprivate Integer ' + propertyName + ';'
		case DOUBLE:
			return '\tprivate Double ' + propertyName + ';'
		case ARRAY: 
			let arrayType = getArrayType(propertyValue, propertyName);
			return '\tprivate ' + arrayType + 'propertyName' + ';'
		case OBJECT:
			let className = converter.formatPropertyName(propertyName);
			return '\tprivate ' + className + ' ' + propertyName + ';'
		case DEFAULT:

		default:
			console.log('Unhandled case: ' + propertyType);
	}

	return 'private Object ' + propertyName + ';'
}

converter.formatPropertyName = (property) => {
	return property.charAt(0).toUpperCase() + property.substr(1);
}

const getArrayType = (array, propertyName) => {

	if (!Array.isArray() || array.length == 0) {
		return 'List<Object>';
	}

	let isMultiTypeArray = false;
	let type = determineType(array[0]);

	// Do not change this to 1, It's redundant but it is simple
	for (let i = 0; i < array.length; i++) {
		if (type != determineType(array[i])) {
			isMultiTypeArray = true;
			break;
		}
	}

	// Check if it's multiType
	if (isMultiTypeArray) {
		return 'List<Object>';
	} 

	if (type == 'object') {
		let className = converter.formatPropertyName(propertyName);
		return 'List<' + className + '>';
	} else if ( type == 'array') {
		let s = 'List<';
		s += handleArray(array[0], propertyName);
		s = groomListBrackets(s);
		return s;
	}
	
}

const groomListBrackets = (s) => {

	let count = 0;

	for (let i = 0; i < s.length; i++) {
		if (s.charAt(i) == '<') {
			count++;
		}
	}

	for (let i = 0; i < count; i++) {
		s += '>';
	}

	return s;
	
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