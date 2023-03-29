const app = module.exports = require('express')();

const {} = require('../../actions/service').static;

app.get('/address/list', getAddressList);
app.get('/grade/list', getGradeList);
app.get('/subject/list', getSubjectList);