import postgres from "postgres";

const sql = postgres({
    host                 : 'localhost',            
    port                 : 5432,          
    database             : 'loaddy_db',            
    username             : 'loaddy_user',            
    password             : 'loaddy_password',
})

export default sql;