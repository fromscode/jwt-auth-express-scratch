import pool from "./pool.js";

async function saveUser(username: string, password: string) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    password,
  ]);
}

export default {
  saveUser,
};
