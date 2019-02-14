const fs = require('fs');
const javaConverter = require('./lib/javaConverter.js')

const dirName = __dirname + '/json';

fs.readdir(dirName, (err, fileNames) => {
	
	if (err) {
		console.log(err);
		throw err;
	} 

	fileNames.forEach((fileName) => {
		let fileToRead = dirName + '/' + fileName;
		console.log('Reading ... ' + fileToRead);

		readFile('/' + fileToRead)
		.then((result) => {
			convertJsonObject(result, fileName);
		})
		.catch(err => console.log(err));
	});
});

const readFile = (file) => {

	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(JSON.parse(data));
			}
		})
	});
	
}

const writeFile = (className, data) => {

	let fileName = className + '.java';

	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, data, (err) => {
			if (err) {
				reject(err);
			} else {
				console.log('Data written to fileName\n' + data);
				resolve(fileName);
			}
		})
	});

}

const convertJsonObject = (obj, className) => {

	let content = javaConverter.getClassHeader(className) + '\n';

	Object.keys(obj).forEach((key) => {

		if (obj[key] instanceof Array) {
			convertJsonArray(obj[key], key);
		} else if (typeof obj[key] == 'object') {
			convertJsonObject(obj[key], key); 
		}

		content += javaConverter.getPropertyConversion(key, obj[key]) '\n';

	});

	content += javaConverter.getClassFooter();

	writeFile(className, content)
	.then((content) => console.log('Wrote...\n' + content))
	.catch((err) => console.log(err));

}

const convertJsonArray = (array, arrName) => {

	if (!Array.isArray() || array.length == 0) {
		return;
	}

	arrName = javaConverter.formatPropertyName(arrName);

	for (int i = 0; i < array.length; i++) {
		if (getType(array[i]) == 'object') {
			convertJsonObject(array[i], arrName + '_' + i);
		}
	}

}

const getType = getType(x) => {

	let type = typeof x;

	if (type == 'object') {
		if (x instanceof Array) {
			return 'array';
		} else {
			return 'object';
		}
	}

	if (type == 'boolean') {
		return type;
	}

	if (type == 'string') {
		return type;
	}

	if (type == 'number') {
		return type;
	}
}
