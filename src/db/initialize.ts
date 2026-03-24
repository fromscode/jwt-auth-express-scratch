import pool from "./pool.js";

const createQuery = `
CREATE TABLE users (
  id  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);`;

async function main() {
  await pool.query(createQuery);
}

main();
