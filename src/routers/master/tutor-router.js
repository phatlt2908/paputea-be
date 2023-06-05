const app = module.exports = require('express')();
const { checkToken } = require('../../actions/master').auth;
const { getTutorList, getTutorDetail, approveTutor } = require('../../actions/master').tutor;

app.use(checkToken);

app.post('/list', getTutorList);
app.get('/detail', getTutorDetail);
app.get('/approve', approveTutor);
