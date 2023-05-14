const app = module.exports = require('express')();

const {} = require('../../actions/service').static;

app.get('/address/province/list', getProvinceList);
app.get('/address/district/list', getDistrictList);
app.get('/grade/list', getGradeList);
app.get('/subject/list', getSubjectList);