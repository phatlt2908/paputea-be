module.exports = {
    REGISTER_NEW_USER: `INSERT INTO "users" (username, password, name, email) VALUES ($1, $2, $3, $4)`,
    GET_USER_BY_USERNAME: `SELECT "users".* FROM "users" WHERE "users".username = $1`,
    GET_USER_BY_EMAIL: `SELECT "users".* FROM "users" WHERE "users".email = $1`,
    GET_USER_BY_USERNAME_OR_EMAIL: `SELECT "users".* FROM "users" WHERE "users".username = $1 OR "users".email = $2`,
    UPDATE_PASSWORD: `UPDATE "users" SET password = $2 WHERE username = $1`
}