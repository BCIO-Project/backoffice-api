process.env.NODE_ENV = process.env.NODE_ENV ?  process.env.NODE_ENV : 'dev';
require('dotenv').config({path : process.cwd() + '/config/' + process.env.NODE_ENV + '/.env'})

const config = require(__dirname + '/' + process.env.NODE_ENV + '/config.js');

if (process.env.NODE_ENV === 'dev')
  console.log(config);

module.exports = config;