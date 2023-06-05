const app = (module.exports = require("express")());
const { checkToken } = require("../../actions/master").auth;
const {
  getClassList,
  getClassDetail,
  getCenterClassList,
  getTutorApproved,
  approveClass,
  approveRequestedClass,
  approveCenterClass,
  undoApproveRequestedClass,
  getTutorClassList
} = require("../../actions/master").class;

app.use(checkToken);

app.post("/list", getClassList);
app.get("/detail", getClassDetail);
app.get("/approve", approveClass);
app.get("/approve-requested", approveRequestedClass);
app.get("/undo-approve-requested", undoApproveRequestedClass);
app.get("/tutor-approved", getTutorApproved);
app.get("/tutor-requested", getTutorRequested);
app.post("/center-class-list", getCenterClassList);
app.get("/center-class-approve", approveCenterClass); 
app.post("/tutor-class-list", getTutorClassList);
