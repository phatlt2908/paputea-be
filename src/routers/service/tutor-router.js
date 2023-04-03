const app = (module.exports = require("express")());

const {} = require("../../actions/service").tutor;

app.post("/create", createTutor);
