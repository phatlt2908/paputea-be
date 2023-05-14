const pool = require("../../../configs/psql-connect");
const staticRepo = require("../../respository/service/static-repo");

getProvinceList = async function (req, res) {
  try {
    const sqlProvinceList = await pool.query(staticRepo.PROVINCE_LIST);
    res.status(200).send(sqlProvinceList.rows);
  } catch (err) {
    console.error("Load province list failed:", err);
  }
};

getDistrictList = async function (req, res) {
  try {
    const provinceId = req.query.provinceId;
    const sqlDistrictList = await pool.query(staticRepo.DISTRICT_LIST, [provinceId]);
    res.status(200).send(sqlDistrictList.rows);
  } catch (err) {
    console.error("Load district list failed:", err);
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
  getProvinceList,
  getDistrictList,
  getGradeList,
  getSubjectList,
};
