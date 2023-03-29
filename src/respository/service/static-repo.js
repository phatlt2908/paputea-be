module.exports = {
  ADDRESS_LIST: `SELECT address.id AS id, address.code AS code, address.name AS name
        FROM static_address AS address
        ORDER BY id ASC`,
  GRADE_LIST: `SELECT grade.id AS id, grade.code AS code, grade.name AS name
        FROM static_grade AS grade
        ORDER BY id ASC`,
  SUBJECT_LIST: `SELECT subjects.id AS id, subjects.code AS code, subjects.name AS name
        FROM subjects
        ORDER BY id ASC`,
};
