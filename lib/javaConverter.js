const beginJavaFile = (className) => {
	return 'public class ' + className + ' {';
}

const endJavaFile = () => {
	return '}';
}

const BOOLEAN = 'boolean';
const STRING = 'string';
const INTEGER = 'integer';
const DOUBLE = 'double';
const ARRAY = 'array';
const OBJECT = 'object';

const appendToJavaFile = (propertyName, propertyType) => {

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
}

module.exports = javaConverter;