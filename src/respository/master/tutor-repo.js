module.exports = {
  GET_TUTOR_BY_ID: `SELECT
      tutors.id AS "id",
      tutors.tutor_name AS "name",
      tutors.phone AS "phone",
      tutors.email AS "email",
      tutors.gender AS "gender",
      tutors.birthday AS "birthday",
      tutors.job AS "job",
      tutors.avatar AS "avatar",
      workplace_province.name AS "workplaceProvince",
      workplace_district.name AS "workplaceDistrict",
      tutors.workplace_detail AS "workplaceDetail",
      tutors.school AS "school",
      tutors.major AS "major",
      tutors.graduation_year AS "graduationYear",
      tutors.graduation_grade AS "graduationGrade",
      teaching_area_province.name AS "teachingAreaProvince",
      teaching_area_district.name AS "teachingAreaDistrict",
      tutors.teaching_area_detail AS "teachingAreaDetail",
      tutors.desired_tuition AS "desiredTuition",
      tutors.free_times AS "freeTimes",
      tutors.advantage AS "advantage",
      tutors.note AS "note",
      tutors.is_approved AS "isApproved",
      tutors.registration_date AS "registrationDate"
    FROM tutors
    LEFT JOIN static_district AS workplace_district
      ON workplace_district.id = tutors.workplace_district_id
    LEFT JOIN static_province AS workplace_province
      ON workplace_province.id = workplace_district.province_id
    LEFT JOIN static_district AS teaching_area_district
      ON teaching_area_district.id = tutors.teaching_area_district_id
    LEFT JOIN static_province AS teaching_area_province
      ON teaching_area_province.id = teaching_area_district.province_id
    WHERE
    tutors.id = $1`,
  APPROVE_TUTOR: `UPDATE tutors
    SET is_approved = true
    WHERE
      id = $1`,
};
