const app = (module.exports = require("express")());

const {} = require("../../actions/service").class;

app.post("/create", createClass);
app.get("/list", getClassList);
