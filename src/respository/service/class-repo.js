module.exports = {
  CREATE_CLASS: `INSERT INTO classes (class_code, register_name, district_id,
      address_detail, register_phone, grade_id, subject_id, sessions_per_week,
      opening_day, note, status, registration_date, tutor_type, tuition,
      is_online, is_personal)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
  COUNT_ALL_CLASSES: `SELECT COUNT(classes.id) as count
    FROM classes`,
  CREATE_CENTER_CLASS: `INSERT INTO center_classes (register_name, 
    register_phone, grade_id, subject_id, sessions_per_week, opening_day,
    note, is_confirmed, registration_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
  GET_CLASS_DETAIL: `SELECT classes.id AS "id",
      classes.class_code AS "code",
      province.name AS "province",
      district.name AS "district",
      grade.name AS "gradeName",
      subject.name AS "subjectName",
      classes.sessions_per_week AS "sessionsPerWeek",
      classes.opening_day AS "openingDay",
      classes.tutor_type AS "tutorType",
      classes.tuition AS "tuition",
      classes.status AS "status",
      classes.registration_date AS "registrationDate",
      classes.note AS "note",
      classes.like_count AS "likeCount",
      classes.is_online AS "isOnline",
      classes.is_personal AS "isPersonal"
    FROM classes
    INNER JOIN static_district AS district
      ON district.id = classes.district_id
    INNER JOIN static_province AS province
      ON province.id = district.province_id
    INNER JOIN static_grade AS grade
      ON grade.id = classes.grade_id
    INNER JOIN static_subject AS subject 
      ON subject.id = classes.subject_id
    WHERE classes.class_code = $1`,
  CHECK_EXIST_CLASS_ID: `SELECT classes.id AS "id"
    FROM classes
    WHERE classes.id = $1
      AND status <> 3`,
  LIKE_CLASS: `UPDATE classes
    SET like_count = CASE
      WHEN $1 = TRUE THEN like_count + 1
      ELSE like_count - 1
    END
    WHERE classes.class_code = $2`,
};
