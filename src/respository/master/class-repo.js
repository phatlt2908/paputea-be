module.exports = {
  GET_CLASS_BY_ID: `SELECT
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
      classes.tuition AS "tuition"
    FROM classes
    LEFT JOIN static_address
      ON static_address.id = classes.address_id
    LEFT JOIN static_grade
      ON static_grade.id = classes.grade_id
    LEFT JOIN static_subject
      ON static_subject.id = classes.subject_id
    WHERE
    classes.id = $1`,
  GET_TUTOR_APPROVED_BY_CLASS_ID: `SELECT
      tutor_class.tutor_id AS "tutorId",
      tutors.tutor_name AS "tutorName",
      tutors.phone AS "tutorPhone"
    FROM tutor_class
    INNER JOIN tutors
      ON tutors.id = tutor_class.tutor_id
    WHERE
      tutor_class.class_id = $1
      AND tutor_class.is_approved = true`,
  GET_TUTOR_REQUESTED_BY_CLASS_ID: `SELECT
      tutors.id AS "tutorId",
      tutors.tutor_code AS "tutorCode",
      tutors.tutor_name AS "tutorName",
      tutors.phone AS "tutorPhone",
      static_address.name AS "province",
      tutors.free_times AS "freeTimes",
      tutors.is_approved AS "isTutorApproved",
      tutor_class.registration_date AS "requestDate",
      tutor_class.is_approved AS "isRequestApproved"
    FROM tutor_class
    INNER JOIN tutors
      ON tutors.id = tutor_class.tutor_id
    LEFT JOIN static_address
      ON static_address.id = tutors.teaching_area_id
    WHERE
      tutor_class.class_id = $1
    ORDER BY
      tutor_class.is_approved DESC, tutor_class.registration_date DESC`,
  UPDATE_CLASS_STATUS: `UPDATE classes
    SET status = $2
    WHERE
      id = $1`,
  CHECK_CLASS_APPROVED_REQUESTED: `SELECT class_id
    FROM tutor_class
    WHERE
      class_id = $1
      AND is_approved = true`,
  APPROVE_REQUESTED_CLASS: `UPDATE tutor_class
    SET is_approved = true
    WHERE
      tutor_id = $1
      AND class_id = $2
      AND is_approved = false`,
  UNDO_APPROVE_REQUESTED_CLASS: `UPDATE tutor_class
    SET is_approved = false
    WHERE
      class_id = $1`,
};
