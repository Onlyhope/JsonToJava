let primary = {};

primary.personName = 'Aaron Lee';
primary.age = 26;
primary.hobbies = ['Powerlifting', 'Coding', 'Reading'];

let mother = {};

mother.personName = 'Cindy Lee';
mother.age = 57;
mother.hobbies = ['Gardening', 'Cleaning'];

let father = {};

father.personName = 'Alex Lee';
father.age = 62;
father.hobbies = ['Fishing', 'Hunting']

let family = {}

// family.primary = primary;
// family.mother = mother;
// family.father = father;
family.size = 3;
family.livingSpace = 'House'
family.income = 143914.94
family.alive = true

const dirName = __dirname + '/data';

const fs = require('fs');

fs.writeFile(dirName + '/family.json', JSON.stringify(family), (err) => {
	if (err) {
		throw err;
	}

	console.log('success');
});


console.log(family);

module.exports = family;


