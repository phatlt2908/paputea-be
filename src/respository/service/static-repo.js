module.exports = {
  ADDRESS_LIST: `SELECT address.id AS id, address.code AS code, address.name AS name
        FROM static_address AS address
        ORDER BY id ASC`,
  GRADE_LIST: `SELECT grade.id AS id, grade.code AS code, grade.name AS name
        FROM static_grade AS grade
        ORDER BY id ASC`,
  SUBJECT_LIST: `SELECT subject.id AS id, subject.code AS code, subject.name AS name
        FROM static_subject AS subject
        ORDER BY id ASC`,
};
