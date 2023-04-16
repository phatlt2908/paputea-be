const app = module.exports = require('express')();
const { checkToken } = require('../../actions/master').auth;
const { getClassList, getClassDetail, getCenterClassList } = require('../../actions/master').class;

app.use(checkToken);

app.post('/list', getClassList);
app.get('/detail', getClassDetail);
app.post('/center-class-list', getCenterClassList);