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
            OR LOWER(classes.register_name) LIKE '%' || LOWER($2) || '%'
            OR LOWER(classes.register_phone) LIKE '%' || LOWER($2) || '%'
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
    const pagingAndSortSql = `ORDER BY classes.registration_date DESC, classes.id DESC
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
      pagination: {
        itemsPerPage: itemsPerPage,
        currentPage: currentPage,
        totalClasses: Number(count),
      },
    });
  } catch (err) {
    console.error("load class list failed:", err);
    res.status(400).send({ mes: err });
  }
};

getClassDetail = async function (req, res) {
  try {
    const classId = req.query.id;

    const classSqlResult = await pool.query(classRepo.GET_CLASS_BY_ID, [
      classId,
    ]);

    res.status(200).send(classSqlResult.rows[0]);
  } catch (err) {
    console.error("Load class detail failed:", err);
    res.status(400).send({ mes: err });
  }
};

getTutorApproved = async function (req, res) {
  try {
    const classId = req.query.classId;

    const tutorApprovedResult = await pool.query(
      classRepo.GET_TUTOR_APPROVED_BY_CLASS_ID,
      [classId]
    );

    res.status(200).send(tutorApprovedResult.rows[0]);
  } catch (err) {
    console.error("Load class detail failed:", err);
    res.status(400).send({ mes: err });
  }
};

getTutorRequested = async function (req, res) {
  try {
    const classId = req.query.classId;

    const tutorRequestedResult = await pool.query(
      classRepo.GET_TUTOR_REQUESTED_BY_CLASS_ID,
      [classId]
    );

    res.status(200).send(tutorRequestedResult.rows);
  } catch (err) {
    console.error("Load tutor requested failed:", err);
    res.status(400).send({ mes: err });
  }
};

approveClass = async function (req, res) {
  try {
    const classId = req.query.classId;

    const result = await pool.query(classRepo.UPDATE_CLASS_STATUS, [
      classId,
      20,
    ]);

    if (result.rowCount) {
      res.status(200).send();
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error("Approve class failed:", err);
    res.status(400).send({ mes: err });
  }
};

approveRequestedClass = async function (req, res) {
  try {
    const classId = req.query.classId;
    const tutorId = req.query.tutorId;

    const checked = await pool.query(classRepo.CHECK_CLASS_APPROVED_REQUESTED, [
      classId,
    ]);
    if (checked.rows.length) {
      throw new Error("Error: This class is approved selected");
    }

    const requestedResult = await pool.query(
      classRepo.APPROVE_REQUESTED_CLASS,
      [tutorId, classId]
    );
    const classResult = await pool.query(classRepo.UPDATE_CLASS_STATUS, [
      classId,
      30,
    ]);

    if (requestedResult.rowCount && classResult.rowCount) {
      res.status(200).send();
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error("Approve class failed:", err);
    res.status(400).send({ mes: err });
  }
};

undoApproveRequestedClass = async function (req, res) {
  try {
    const classId = req.query.classId;

    const requestedResult = await pool.query(
      classRepo.UNDO_APPROVE_REQUESTED_CLASS,
      [classId]
    );
    const classResult = await pool.query(classRepo.UPDATE_CLASS_STATUS, [
      classId,
      20,
    ]);

    if (requestedResult.rowCount && classResult.rowCount) {
      res.status(200).send();
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error("Undo approve class failed:", err);
    res.status(400).send({ mes: err });
  }
};

getCenterClassList = async function (req, res) {
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
      ? "center_classes.is_confirmed = ANY($1) "
      : "(center_classes.is_confirmed = ANY($1) OR TRUE = TRUE) ";
    searchSQL += keywordSearch
      ? `AND (LOWER(center_classes.register_name) LIKE '%' || LOWER($2) || '%'
            OR LOWER(center_classes.register_phone) LIKE '%' || LOWER($2) || '%'
            OR LOWER(static_grade.name) LIKE '%' || LOWER($2) || '%') `
      : "AND (center_classes.register_name = $2 OR TRUE = TRUE) ";

    const selectSql = `SELECT
      center_classes.id AS "id",
      center_classes.register_name AS "registerName",
      center_classes.register_phone AS "registerPhone",
      static_grade.name AS "grade",
      static_subject.name AS "subject",
      center_classes.sessions_per_week AS "sessionsPerWeek",
      center_classes.opening_day AS "openingDay",
      center_classes.note AS "note",
      center_classes.is_confirmed AS "isConfirmed",
      center_classes.registration_date AS "registrationDate" `;
    const countSql = `SELECT COUNT(center_classes.id) as count `;
    const conditionSql = `FROM center_classes
      LEFT JOIN static_grade
        ON static_grade.id = center_classes.grade_id
      LEFT JOIN static_subject
        ON static_subject.id = center_classes.subject_id
      WHERE
        ${searchSQL} `;
    const pagingAndSortSql = `ORDER BY center_classes.registration_date DESC, center_classes.id DESC
      LIMIT $3 OFFSET $4`;

    const sqlSelectInputValues = [
      statusList,
      keywordSearch,
      itemsPerPage,
      (currentPage - 1) * itemsPerPage,
    ];
    const sqlCountInputValues = [statusList, keywordSearch];

    const sqlCenterClassList = await pool.query(
      selectSql + conditionSql + pagingAndSortSql,
      sqlSelectInputValues
    );
    const sqlCount = await pool.query(
      countSql + conditionSql,
      sqlCountInputValues
    );
    const count = sqlCount.rows[0].count;

    res.status(200).send({
      centerClassList: sqlCenterClassList.rows,
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
  getClassDetail,
  getTutorApproved,
  getTutorRequested,
  getCenterClassList,
  approveClass,
  approveRequestedClass,
  undoApproveRequestedClass,
};
