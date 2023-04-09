const pool = require("../../../configs/psql-connect");
const classRepo = require("../../respository/service/class-repo");
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

requestClass = async function (req, res) {
  try {
    const tutorId = req.body.tutorId;
    const classId = req.body.classId;

    const sqlTutorInfo = await pool.query(tutorRepo.CHECK_EXIST_TUTOR, [
      tutorId,
    ]);
    if (!sqlTutorInfo.rows.length) {
      res.status(400).send({ error: "ER01" });
      return;
    }

    const sqlClassInfo = await pool.query(classRepo.CHECK_EXIST_CLASS_ID, [
      classId,
    ]);
    if (!sqlClassInfo.rows.length) {
      res.status(400).send({ error: "ER02" });
      return;
    }

    const sqlIsRegisted = await pool.query(tutorRepo.CHECK_REGISTED_CLASS, [
      tutorId,
      classId,
    ]);
    if (sqlIsRegisted.rows.length) {
      res.status(400).send({ error: "ER03" });
      return;
    }

    await pool.query(tutorRepo.REGIST_CLASS, [
      tutorId,
      classId,
      new Date(),
      false,
    ]);

    res.status(200).send();
  } catch (err) {
    console.error("Request class failed:", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createTutor,
};
