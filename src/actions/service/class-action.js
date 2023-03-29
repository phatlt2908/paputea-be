const pool = require("../../../configs/psql-connect");
const classRepo = require("../../respository/service/class-repo");

createClass = async function (req, res) {
  try {
    const data = req.body;

    await pool.query(classRepo.CREATE_CLASS, [
      data.registerName,
      data.addressId,
      data.addressDetail,
      data.registerPhone,
      data.gradeId,
      data.subjectId,
      data.sessionsPerWeek,
      data.openingDay,
      data.note,
      true, // isApproved
      10, // status
      new Date(),
    ]);

    res.status(200).send();
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

getClassList = async function (req, res) {
  try {
    const sqlTagList = await pool.query(classRepo.GET_TAG_LIST);

    res.status(200).send(sqlTagList.rows);
  } catch (err) {
    console.error("load tag list failed:", err);
  }
};

module.exports = {
  createClass,
  getClassList,
};
