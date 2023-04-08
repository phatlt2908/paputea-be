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
      data.addressId,
      data.addressDetail,
      data.registerPhone,
      data.gradeId,
      data.subjectId,
      data.sessionsPerWeek,
      data.openingDay,
      data.note,
      false, // isApproved
      10, // status
      new Date(),
      data.tutorType,
      data.tuition,
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
    const addresses = req.body.query.addresses;
    const grades = req.body.query.grades;
    const subjects = req.body.query.subjects;
    const tutorTypes = req.body.query.tutorTypes;

    var sort;
    switch (req.body.sort) {
      case 1:
        sort = "classes.registration_date DESC";
        break;
      case 2:
        sort = "classes.tuition ASC";
        break;
      case 3:
        sort = "classes.tuition DESC";
        break;

      default:
        sort = "classes.registration_date DESC";
        break;
    }
    const sqlClassList = await pool.query(classRepo.GET_CLASS_LIST, [
      addresses,
      grades,
      subjects,
      tutorTypes,
      sort,
      itemsPerPage,
      (currentPage - 1) * itemsPerPage,
    ]);

    const sqlCount = await pool.query(classRepo.COUNT_ALL_CLASSES);
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
