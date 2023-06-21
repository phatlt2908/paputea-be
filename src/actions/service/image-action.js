const pool = require("../../../configs/psql-connect");
const drive = require("../../../configs/ggDrive/drive");

uploadImage = async function (req, res) {
  try {
    console.log("req >>> ", req);
    drive.uploadFile(req.file, res, saveImage);
  } catch (err) {
    console.error("upload image failed:", err);
    res.status(400).send({ mes: err });
  }
};

saveImage = function (res, file) {
  let imageUrl = "https://drive.google.com/uc?id=" + file.imageId;

  let result = {
    fileName: file.fileName,
    uploaded: 1,
    url: imageUrl,
  };
  res.status(200).send(result);
};

module.exports = {
  uploadImage
};
