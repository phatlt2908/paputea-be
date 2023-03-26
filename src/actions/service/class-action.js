const pool = require('../../../configs/psql-connect');
const classRepo = require('../../respository/service/class-repo');

createClass = async function (req, res) {
    try {
        const sqlTagList = await pool.query(classRepo.CREATE_CLASS);

        res.status(200).send(sqlTagList.rows);
    } catch (err) {
        console.error("load tag list failed:", err);
    }
}

getClassList = async function (req, res) {
    try {
        const sqlTagList = await pool.query(classRepo.GET_TAG_LIST);

        res.status(200).send(sqlTagList.rows);
    } catch (err) {
        console.error("load tag list failed:", err);
    }
}

module.exports = {
    getClassList,
}