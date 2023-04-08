const app = (module.exports = require("express")());

const {} = require("../../actions/service").class;

app.post("/create", createClass);
app.post("/list", getClassList);
app.get("/detail", getClassDetail);
app.post("/center/create", createCenterClass);
