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
};
