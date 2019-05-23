const moment = require('moment');
const timestamp = moment().utc().format('YYYY-MM-DD-HHmmss');
const postName = `${timestamp}-${process.argv[2]||'noname'}`;

console.log(postName);