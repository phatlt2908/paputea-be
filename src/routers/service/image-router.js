const app = (module.exports = require("express")());

const {} = require("../../actions/service").image;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('upload'), uploadImage);