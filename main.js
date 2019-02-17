const fs = require('fs');
const javaConverter = require('./lib/javaConverter.js')

const dirName = __dirname + '/json';

let main = {};

main.parseDir = (dirName) => {

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
				main.convertJsonObject(result, fileName);
			})
			.catch(err => console.log(err));
		});
	});

}

main.parseFile = (fileUri) => {

	readFile(fileUri)
	.then((result) => {
		main.convertJsonObject(result, fileUri);
	})
	.catch(err => console.log(err));

}

const readFile = (file) => {

	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(JSON.parse(data));
			}
		});
	});
	
}

const writeFile = (fileUri, data) => {

	let fileName = fileUri.replace(".json", ".java");

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

const getClassName = (fileUri) => {
	let fileName = fileUri;
	fileName = fileUri.substr(fileUri.lastIndexOf('/') + 1).replace('.json', '');
	fileName = fileName.charAt(0).toUpperCase() + fileName.substr(1);
	return fileName;
}

main.convertJsonObject = (obj, fileUri) => {

	let className = getClassName(fileUri);
	console.log('Classname', className);
	let content = javaConverter.getClassHeader(className) + '\n';

	Object.keys(obj).forEach((key) => {

		if (obj[key] instanceof Array) {
			main.convertJsonArray(obj[key], key);
		} else if (typeof obj[key] == 'object') {
			main.convertJsonObject(obj[key], key); 
		}

		content += javaConverter.getPropertyConversion(key, obj[key]) + '\n';

	});

	content += javaConverter.getClassFooter();

	writeFile(fileUri, content)
	.then((content) => console.log('Wrote...\n' + content))
	.catch((err) => console.log(err));

}

main.convertJsonArray = (array, arrName) => {

	if (!Array.isArray() || array.length == 0) {
		return;
	}

	arrName = javaConverter.formatPropertyName(arrName);

	for (let i = 0; i < array.length; i++) {
		if (main.getType(array[i]) == 'object') {
			main.convertJsonObject(array[i], arrName + '_' + i);
		}
	}

}

main.getType = (x)=> {

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

module.exports = main;