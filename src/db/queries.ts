import pool from "./pool.js";

async function saveUser(username: string, password: string) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    password,
  ]);
}

async function getUserByUsername(username: string) {
  return (
    await pool.query("SELECT * FROM users WHERE username = $1", [username])
  ).rows[0];
}

export default {
  saveUser,
  getUserByUsername,
};
