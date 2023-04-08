module.exports = {
  CREATE_TUTOR: `INSERT INTO tutors (tutor_code, tutor_name, phone, password,
      email, gender, birthday, job, workplace_id, workplace_detail, card_id,
      card_image_front, card_image_back, avatar, school, major, graduation_year,
      graduation_grade, graduation_image, teaching_area_id, teaching_area_detail,
      desired_tuition, free_times, advantage, note, is_approved, registration_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
      $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)`,
  GET_TUTOR_BY_PHONE: `SELECT
      tutors.tutor_name AS "name",
      address.name AS "province",
      tutors.is_approved AS "isApproved"
    FROM tutors
    INNER JOIN static_address AS address
      ON address.id = tutors.workplace_id
    WHERE tutors.phone = $1`,
};