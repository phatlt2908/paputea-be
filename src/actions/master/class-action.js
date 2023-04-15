const pool = require("../../../configs/psql-connect");
const classRepo = require("../../respository/master/class-repo");

getClassList = async function (req, res) {
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
      ? "classes.status = ANY($1) "
      : "(classes.status = ANY($1) OR TRUE = TRUE) ";
    searchSQL += keywordSearch
      ? `AND (LOWER(classes.class_code) LIKE '%' || LOWER($2) || '%'
            OR LOWER(static_address.name) LIKE '%' || LOWER($2) || '%'
            OR LOWER(static_grade.name) LIKE '%' || LOWER($2) || '%') `
      : "AND (classes.class_code = $2 OR TRUE = TRUE) ";

    const selectSql = `SELECT
      classes.id AS "id",
      classes.class_code AS "classCode",
      classes.register_name AS "registerName",
      static_address.name AS "addressProvince",
      classes.address_detail AS "addressDetail",
      classes.register_phone AS "registerPhone",
      static_grade.name AS "grade",
      static_subject.name AS "subject",
      classes.sessions_per_week AS "sessionsPerWeek",
      classes.opening_day AS "openingDay",
      classes.note AS "note",
      classes.status AS "status",
      classes.registration_date AS "registrationDate",
      classes.tutor_type AS "tutorType",
      classes.tuition AS "tuition"`;
    const countSql = `SELECT COUNT(classes.id) as count `;
    const conditionSql = `FROM classes
      LEFT JOIN static_address
        ON static_address.id = classes.address_id
      LEFT JOIN static_grade
        ON static_grade.id = classes.grade_id
      LEFT JOIN static_subject
        ON static_subject.id = classes.subject_id
      WHERE
        ${searchSQL} `;
    const pagingAndSortSql = 
      `ORDER BY classes.registration_date DESC
      LIMIT $3 OFFSET $4`;

    const sqlSelectInputValues = [
      statusList,
      keywordSearch,
      itemsPerPage,
      (currentPage - 1) * itemsPerPage,
    ];
    const sqlCountInputValues = [statusList, keywordSearch];

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
    res.status(400).send({ mes: err });
  }
};

module.exports = {
  getClassList,
};
