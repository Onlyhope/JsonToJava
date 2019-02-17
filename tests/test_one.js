const converter = require('../main');
const fs = require('fs');

console.log(converter);

const dirName = __dirname + '/data';

converter.parseFile(dirName + '/family.json');

