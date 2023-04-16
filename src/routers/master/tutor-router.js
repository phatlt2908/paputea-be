const app = module.exports = require('express')();
const { checkToken } = require('../../actions/master').auth;
const { getTutorList } = require('../../actions/master').tutor;

app.use(checkToken);

app.post('/list', getTutorList);
