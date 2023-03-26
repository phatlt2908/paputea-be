const app = module.exports = require('express')();

const {} = require('../../actions/service').class;

app.get('/list', getClassList);