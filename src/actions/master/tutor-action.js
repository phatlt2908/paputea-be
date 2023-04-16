const pool = require("../../../configs/psql-connect");

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

module.exports = {
  getTutorList,
};
