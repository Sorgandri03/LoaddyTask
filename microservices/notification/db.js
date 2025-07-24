import postgres from "postgres";

const sql = postgres({
    host                 : '127.0.0.1',
    port                 : 5432,
    database             : 'loaddy_db',
    username             : 'loaddy_user',
    password             : 'loaddy_pwd',
})

export default sql;