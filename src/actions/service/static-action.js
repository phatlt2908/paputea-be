const pool = require("../../../configs/psql-connect");
const staticRepo = require("../../respository/service/static-repo");

getAddressList = async function (req, res) {
  try {
    const sqlAddressList = await pool.query(staticRepo.ADDRESS_LIST);
    res.status(200).send(sqlAddressList.rows);
  } catch (err) {
    console.error("Load address list failed:", err);
  }
};

getGradeList = async function (req, res) {
  try {
    const sqlGradeList = await pool.query(staticRepo.GRADE_LIST);
    res.status(200).send(sqlGradeList.rows);
  } catch (err) {
    console.error("Load grade list failed:", err);
  }
};

getSubjectList = async function (req, res) {
  try {
    const sqlSubjectList = await pool.query(staticRepo.SUBJECT_LIST);
    res.status(200).send(sqlSubjectList.rows);
  } catch (err) {
    console.error("Load subject list failed:", err);
  }
};

module.exports = {
  getAddressList,
  getGradeList,
  getSubjectList,
};
