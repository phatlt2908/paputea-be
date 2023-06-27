const pool = require("../../../configs/psql-connect");
const drive = require("../../../configs/ggDrive/drive");
const tutorRepo = require("../../respository/service/tutor-repo");

uploadImage = async function (req, res) {
  try {
    const file = await drive.uploadFile(req.file);

    let imageUrl = "https://drive.google.com/uc?id=" + file.imageId;

    await pool.query(tutorRepo.UPDATE_TUTOR_AVATAR, [imageUrl, req.body.tutorId]);

    let result = {
      fileName: file.fileName,
      uploaded: 1,
      url: imageUrl,
    };
    res.status(200).send(result);
  } catch (err) {
    console.error("upload image failed:", err);
    res.status(400).send({ mes: err });
  }
};

module.exports = {
  uploadImage,
};
