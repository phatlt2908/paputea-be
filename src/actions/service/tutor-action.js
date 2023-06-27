const pool = require("../../../configs/psql-connect");
const classRepo = require("../../respository/service/class-repo");
const tutorRepo = require("../../respository/service/tutor-repo");

createTutor = async function (req, res) {
  try {
    const data = req.body;

    const sqlPhoneRegisted = await pool.query(tutorRepo.CHECK_DUPLICATE_PHONE, [
      data.phone,
    ]);
    if (sqlPhoneRegisted.rows.length) {
      console.error("Create tutor failed: Duplicate phone");
      res.status(400).send({ error: "tutor-regist-ER01" });
      return;
    }

    await pool.query(tutorRepo.CREATE_TUTOR, [
      data.phone,
      data.tutorName,
      data.phone,
      "",
      data.email,
      data.gender,
      data.birthday,
      data.job,
      data.workplaceDistrictId,
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
      data.teachingAreaDistrictId,
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

getTutorList = async function (req, res) {
  try {
    const itemsPerPage = req.body.pagination.itemsPerPage || 10;
    const currentPage = req.body.pagination.currentPage || 1;

    const selectSql = `SELECT tutors.id AS "id",
    tutors.tutor_name AS "tutorName",
    tutors.job AS "job",
    tutors.major AS "major",
    tutors.avatar AS "avatar",
    tutors.advantage AS "advantage" `;
    const countSql = `SELECT COUNT(tutors.id) as count `;
    const conditionSql = `FROM tutors
      WHERE
      tutors.is_approved = TRUE `;
    const pagingAndSortSql = `ORDER BY tutors.id DESC
      LIMIT $1 OFFSET $2`;

    const sqlSelectInputValues = [
      itemsPerPage,
      (currentPage - 1) * itemsPerPage,
    ];

    const sqlTutorList = await pool.query(
      selectSql + conditionSql + pagingAndSortSql,
      sqlSelectInputValues
    );

    const sqlCount = await pool.query(
      countSql + conditionSql
    );
    const count = sqlCount.rows[0].count;

    res.status(200).send({
      tutorList: sqlTutorList.rows,
      itemsPerPage: itemsPerPage,
      currentPage: currentPage,
      totalClasses: count,
    });
  } catch (err) {
    console.error("load tutor list failed:", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createTutor,
  getTutorList
};
