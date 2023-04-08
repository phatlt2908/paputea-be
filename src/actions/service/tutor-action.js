const pool = require("../../../configs/psql-connect");
const tutorRepo = require("../../respository/service/tutor-repo");

createTutor = async function (req, res) {
  try {
    const data = req.body;

    await pool.query(tutorRepo.CREATE_TUTOR, [
      data.phone,
      data.tutorName,
      data.phone,
      "",
      data.email,
      data.gender,
      data.birthday,
      data.job,
      data.workplaceId,
      data.workplaceDetail,
      data.cardId,
      data.cardImageFront,
      data.cardImageBack,
      data.avatar,
      data.school,
      data.major,
      data.graduationYear,
      data.graduationGrade,
      data.graduationImage,
      data.teachingAreaId,
      data.teachingAreaDetail,
      data.desiredTuition,
      data.freeTimes,
      data.advantage,
      data.note,
      false,
      new Date(),
    ]);

    res.status(200).send();
  } catch (err) {
    console.error("Create tutor failed:", err);
    res.status(500).send("Internal server error");
  }
};

checkPhone = async function (req, res) {
  try {
    const phone = req.query.phone;

    const sqlTutorInfo = await pool.query(tutorRepo.GET_TUTOR_BY_PHONE, [
      phone,
    ]);

    res.status(200).send(sqlTutorInfo.rows[0]);
  } catch (err) {
    console.error("Check tutor failed:", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createTutor,
};
