const pool = require("../../../configs/psql-connect");
const classRepo = require("../../respository/service/class-repo");

createClass = async function (req, res) {
  try {
    const data = req.body;

    const code =
      "P" + new Date().getTime() + "-" + Math.floor(Math.random() * 100);

    await pool.query(classRepo.CREATE_CLASS, [
      code,
      data.registerName,
      data.districtId,
      data.addressDetail,
      data.registerPhone,
      data.gradeId,
      data.subjectId,
      data.sessionsPerWeek,
      data.openingDay,
      data.note,
      10, // status
      new Date(),
      data.tutorType,
      data.tuition,
      !!data.isOnline,
      !!data.isPersonal,
    ]);

    res.status(200).send();
  } catch (err) {
    console.error("Create class failed:", err);
    res.status(500).send("Internal server error");
  }
};

getClassList = async function (req, res) {
  try {
    const itemsPerPage = req.body.pagination.itemsPerPage || 10;
    const currentPage = req.body.pagination.currentPage || 1;
    const addresses =
      req.body.query.addresses && req.body.query.addresses.length
        ? req.body.query.addresses
        : [];
    const grades =
      req.body.query.grades && req.body.query.grades.length
        ? req.body.query.grades
        : [];
    const subjects =
      req.body.query.subjects && req.body.query.subjects.length
        ? req.body.query.subjects
        : [];
    const tutorTypes =
      req.body.query.tutorTypes && req.body.query.tutorTypes.length
        ? req.body.query.tutorTypes
        : [];

    var sort;
    switch (req.body.sort) {
      case "1":
        sort = "classes.registration_date DESC";
        break;
      case "2":
        sort = "classes.tuition ASC";
        break;
      case "3":
        sort = "classes.tuition DESC";
        break;

      default:
        sort = "classes.registration_date DESC";
        break;
    }

    var searchSQL = "";
    searchSQL += addresses.length
      ? `province.code = ANY($1) `
      : "(province.code = ANY($1) OR TRUE = TRUE) ";
    searchSQL += grades.length
      ? `AND grade.code = ANY($2) `
      : "AND (grade.code = ANY($2) OR TRUE = TRUE) ";
    searchSQL += subjects.length
      ? `AND subject.code = ANY($3) `
      : "AND (subject.code = ANY($3) OR TRUE = TRUE) ";
    searchSQL += tutorTypes.length
      ? `AND classes.tutor_type = ANY($4) `
      : "AND (classes.tutor_type = ANY($4) OR TRUE = TRUE) ";

    const selectSql = `SELECT classes.id AS "id",
    classes.class_code AS "code",
    province.name AS "province",
    district.name AS "district",
    grade.name AS "gradeName",
    subject.name AS "subjectName",
    classes.sessions_per_week AS "sessionsPerWeek",
    classes.opening_day AS "openingDay",
    classes.tutor_type AS "tutorType",
    classes.tuition AS "tuition",
    classes.registration_date AS "registrationDate",
    classes.note AS "note",
    classes.like_count AS "likeCount",
    classes.is_online AS "isOnline",
    classes.is_personal AS isPersonal `;
    const countSql = `SELECT COUNT(classes.id) as count `;
    const conditionSql = `FROM classes
      INNER JOIN static_district AS district
        ON district.id = classes.district_id
      INNER JOIN static_province AS province
        ON province.id = district.province_id
      INNER JOIN static_grade AS grade
        ON grade.id = classes.grade_id
      INNER JOIN static_subject AS subject 
        ON subject.id = classes.subject_id
      WHERE
        ${searchSQL} 
        AND classes.status = 20 `;
    const pagingAndSortSql = `ORDER BY ${sort}
      LIMIT $5 OFFSET $6`;

    const sqlSelectInputValues = [
      addresses,
      grades,
      subjects,
      tutorTypes,
      itemsPerPage,
      (currentPage - 1) * itemsPerPage,
    ];
    const sqlCountInputValues = [addresses, grades, subjects, tutorTypes];

    const sqlClassList = await pool.query(
      selectSql + conditionSql + pagingAndSortSql,
      sqlSelectInputValues
    );

    const sqlCount = await pool.query(
      countSql + conditionSql,
      sqlCountInputValues
    );
    const count = sqlCount.rows[0].count;

    res.status(200).send({
      classList: sqlClassList.rows,
      itemsPerPage: itemsPerPage,
      currentPage: currentPage,
      totalClasses: count,
    });
  } catch (err) {
    console.error("load class list failed:", err);
    res.status(500).send("Internal server error");
  }
};

getClassDetail = async function (req, res) {
  const classCode = req.query.classCode;

  try {
    const sqlClassDetail = await pool.query(classRepo.GET_CLASS_DETAIL, [
      classCode,
    ]);

    res.status(200).send(sqlClassDetail.rows[0]);
  } catch (err) {
    console.error("load class detail failed:", err);
    res.status(500).send("Internal server error");
  }
};

createCenterClass = async function (req, res) {
  try {
    const data = req.body;

    await pool.query(classRepo.CREATE_CENTER_CLASS, [
      data.registerName,
      data.registerPhone,
      data.gradeId,
      data.subjectId,
      data.sessionsPerWeek,
      data.openingDay,
      data.note,
      false, // isConfirmed
      new Date(),
    ]);

    res.status(200).send();
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createClass,
  getClassList,
  createCenterClass,
};
