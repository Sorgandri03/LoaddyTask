import postgres from "postgres";

const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: 'loaddy_db',
    username: 'postgres',
    password: 'postgres',
});

export default sql;