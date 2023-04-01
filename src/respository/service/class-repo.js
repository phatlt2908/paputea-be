module.exports = {
  CREATE_CLASS: `INSERT INTO classes (class_code, register_name, address_id,
      address_detail, register_phone, grade_id, subject_id, sessions_per_week,
      opening_day, note, is_approved, status, registration_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
  GET_CLASS_LIST: `SELECT classes.id AS "id",
      classes.class_code AS "code",
      address.name AS "province",
      classes.address_detail AS "addressDetail",
      grade.name AS "gradeName",
      subject.name AS "subjectName",
      classes.sessions_per_week AS "sessionsPerWeek",
      classes.opening_day AS "openingDay",
      classes.registration_date AS "registrationDate",
      classes.note AS "note",
      classes.like_count AS "likeCount"
    FROM classes
    INNER JOIN static_address AS address
      ON address.id = classes.address_id
    INNER JOIN static_grade AS grade
      ON grade.id = classes.grade_id
    INNER JOIN static_subject AS subject 
      ON subject.id = classes.subject_id
    ORDER BY classes.registration_date DESC
    LIMIT 20`,
  CREATE_CENTER_CLASS: `INSERT INTO center_classes (register_name, 
    register_phone, grade_id, subject_id, sessions_per_week, opening_day,
    note, is_confirmed, registration_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
};