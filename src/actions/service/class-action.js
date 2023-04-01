const pool = require("../../../configs/psql-connect");
const classRepo = require("../../respository/service/class-repo");

createClass = async function (req, res) {
  try {
    const data = req.body;

    const now = new Date();
    const year = now.getFullYear().toString().substring(2);
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const dateString = year + month + day;

    const code = "P" + dateString + "-" + Math.floor(Math.random() * 100);

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
    ]);

    res.status(200).send();
  } catch (err) {
    console.error("load class list failed:", err);
    res.status(500).send("Internal server error");
  }
};

getClassList = async function (req, res) {
  try {
    const sqlClassList = await pool.query(classRepo.GET_CLASS_LIST);

    res.status(200).send(sqlClassList.rows);
  } catch (err) {
    console.error("load class list failed:", err);
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
