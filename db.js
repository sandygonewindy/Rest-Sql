import pg from "pg";
const { Pool } = pg;

// console.log(process.env.DB_HOST);
const pool = new Pool({
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    host : process.env.DB_HOST,
    
    port : process.env.DB_PORT,
    ssl : {
        rejectUnauthorized : false
    }
});

export {pool}