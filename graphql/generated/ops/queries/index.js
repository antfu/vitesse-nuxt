const fs = require('fs');
const path = require('path');

module.exports.person = fs.readFileSync(path.join(__dirname, 'person.gql'), 'utf8');
