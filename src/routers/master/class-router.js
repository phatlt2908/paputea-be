const app = module.exports = require('express')();
const { checkToken } = require('../../actions/master').auth;
const { getClassList } = require('../../actions/master').class;

app.use(checkToken);

app.post('/list', getClassList);