import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

const config = {
    user: process.env.DB_USER || "SA",
    password: process.env.DB_PASSWORD || "",
    server: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "test",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function conectarDB() {
    try{
        await sql.connect(config);
        console.log("O Conexion exitosa a SQL Server");
        return sql;
    }catch(error){
        console.log("X Error al conectar con SQL Server:", error);
        process.exit(1);
    }
}

export default conectarDB();