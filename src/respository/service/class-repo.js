module.exports = {
  CREATE_CLASS: `INSERT INTO classes (register_name, address_id, address_detail, 
      register_phone, grade_id, subject_id, sessions_per_week, opening_day,
      note, is_approved, status, registration_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
  GET_TAG_LIST: `SELECT value
    FROM tag
    WHERE tag.value <> '' AND tag.value IS NOT NULL
    ORDER BY tag_count DESC
    LIMIT 20`,
};
