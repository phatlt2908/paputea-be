module.exports = {
  PROVINCE_LIST: `SELECT province.id AS id, province.code AS code, province.name AS name
    FROM static_province AS province
    ORDER BY id ASC`,
  DISTRICT_LIST: `SELECT district.id AS id, district.code AS code, district.name AS name
    FROM static_district AS district
    WHERE district.province_id = $1
    ORDER BY id ASC`,
  GRADE_LIST: `SELECT grade.id AS id, grade.code AS code, grade.name AS name
    FROM static_grade AS grade
    ORDER BY id ASC`,
  SUBJECT_LIST: `SELECT subject.id AS id, subject.code AS code, subject.name AS name
    FROM static_subject AS subject
    ORDER BY id ASC`,
};
