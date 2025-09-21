import mysql from "mysql2/promise"

// export async function connectDB() {
//     const connection = await mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "sibesi"
//     })
//     return connection;
// }

const poolDB =  mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sibesi",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export default poolDB;