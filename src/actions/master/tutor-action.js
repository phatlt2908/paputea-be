const pool = require("../../../configs/psql-connect");
const tutorRepo = require("../../respository/master/tutor-repo");

getTutorList = async function (req, res) {
  try {
    const itemsPerPage = req.body.pagination.itemsPerPage || 10;
    const currentPage = req.body.pagination.currentPage || 1;
    const statusList =
      req.body.query.statusSelecteds && req.body.query.statusSelecteds.length
        ? req.body.query.statusSelecteds
        : [];
    const keywordSearch = req.body.query.keywordSearch;

    var searchSQL = "";
    searchSQL += statusList.length
      ? "tutors.is_approved = ANY($1) "
      : "(tutors.is_approved = ANY($1) OR TRUE = TRUE) ";
    searchSQL += keywordSearch
      ? `AND (LOWER(tutors.tutor_code) LIKE '%' || LOWER($2) || '%'
            OR LOWER(tutors.tutor_name) LIKE '%' || LOWER($2) || '%'
            OR LOWER(tutors.email) LIKE '%' || LOWER($2) || '%'
            OR LOWER(tutors.phone) LIKE '%' || LOWER($2) || '%') `
      : "AND (tutors.tutor_code = $2 OR TRUE = TRUE) ";

    const selectSql = `SELECT
      tutors.id AS "id",
      tutors.tutor_code AS "tutorCode",
      tutors.tutor_name AS "tutorName",
      tutors.phone AS "phone",
      tutors.is_approved AS "isApproved",
      tutors.registration_date AS "registrationDate" `;
    const countSql = `SELECT COUNT(tutors.id) as count `;
    const conditionSql = `FROM tutors
      WHERE
        ${searchSQL} `;
    const pagingAndSortSql = `ORDER BY tutors.registration_date DESC, tutors.id DESC
      LIMIT $3 OFFSET $4`;

    const sqlSelectInputValues = [
      statusList,
      keywordSearch,
      itemsPerPage,
      (currentPage - 1) * itemsPerPage,
    ];
    const sqlCountInputValues = [statusList, keywordSearch];

    const sqlTutorList = await pool.query(
      selectSql + conditionSql + pagingAndSortSql,
      sqlSelectInputValues
    );
    const sqlCount = await pool.query(
      countSql + conditionSql,
      sqlCountInputValues
    );
    const count = sqlCount.rows[0].count;

    res.status(200).send({
      tutorList: sqlTutorList.rows,
      itemsPerPage: itemsPerPage,
      currentPage: currentPage,
      totalItems: count,
    });
  } catch (err) {
    console.error("load tutor list failed:", err);
    res.status(400).send({ mes: err });
  }
};

getTutorDetail = async function (req, res) {
  try {
    const tutorId = req.query.id;

    const tutorSqlResult = await pool.query(tutorRepo.GET_TUTOR_BY_ID, [
      tutorId,
    ]);

    res.status(200).send(tutorSqlResult.rows[0]);
  } catch (err) {
    console.error("Load tutor detail failed:", err);
    res.status(400).send({ mes: err });
  }
};

approveTutor = async function (req, res) {
  try {
    const id = req.query.id;

    const result = await pool.query(tutorRepo.APPROVE_TUTOR, [id]);

    if (result.rowCount) {
      res.status(200).send();
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error("Approve tutor failed:", err);
    res.status(400).send({ mes: err });
  }
};

module.exports = {
  getTutorList,
  getTutorDetail,
  approveTutor,
};
