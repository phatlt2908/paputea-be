module.exports = {
  CREATE_TUTOR: `INSERT INTO tutors (tutor_code, tutor_name, phone, password,
      email, gender, birthday, job, workplace_district_id, workplace_detail, card_id,
      card_image_front, card_image_back, avatar, school, major, graduation_year,
      graduation_grade, graduation_image, teaching_area_district_id, teaching_area_detail,
      desired_tuition, free_times, advantage, note, is_approved, registration_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
      $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
    RETURNING id`,
  GET_TUTOR_BY_PHONE: `SELECT
      tutors.id AS "id",
      tutors.tutor_name AS "name",
      province.name AS "province",
      district.name AS "district",
      tutors.is_approved AS "isApproved"
    FROM tutors
    LEFT JOIN static_district AS district
      ON district.id = tutors.workplace_district_id
    LEFT JOIN static_province AS province
      ON province.id = district.province_id
    WHERE tutors.phone = $1`,
  CHECK_EXIST_TUTOR: `SELECT tutors.id AS id
    FROM tutors 
    WHERE tutors.id = $1`,
  CHECK_REGISTED_CLASS: `SELECT tutor_class.tutor_id AS "tutorId"
    FROM tutor_class 
    WHERE tutor_class.tutor_id = $1
      AND tutor_class.class_id = $2`,
  REGIST_CLASS: `INSERT INTO tutor_class (
      tutor_id,
      class_id,
      registration_date,
      is_approved
    )
    VALUES ($1, $2, $3, $4)`,
  CHECK_DUPLICATE_PHONE: `SELECT tutors.id
    FROM tutors 
    WHERE tutors.phone = $1`,
  UPDATE_TUTOR_AVATAR: `UPDATE tutors
    SET avatar = $1
    WHERE id = $2`
};
